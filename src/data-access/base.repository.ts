import {
  AnyEntity,
  EntityRepository,
  FilterQuery,
  FindOptions,
  IndexFilterQuery,
  IndexName,
  RequiredEntityData,
} from '@mikro-orm/mongodb';
import { createLogger } from '../common/logger';

export abstract class BaseRepository<T extends AnyEntity<T>> {
  protected readonly logger = createLogger(this.constructor.name);

  protected constructor(
    protected readonly emRepository: EntityRepository<T>,
    protected readonly em = emRepository.getEntityManager(),
  ) {}

  async findAndCount(
    where: [IndexName<T>] extends [never]
      ? FilterQuery<T>
      : IndexFilterQuery<T, IndexName<T>>,
    options?: FindOptions<T>,
  ): Promise<[T[], number]> {
    this.logger.log(
      `Executing findAndCount query with filter: ${JSON.stringify(where)}`,
    );

    return this.emRepository.findAndCount(where, options);
  }

  async find(
    filter: [IndexName<T>] extends [never]
      ? FilterQuery<T>
      : IndexFilterQuery<T, IndexName<T>>,
    options?: FindOptions<T>,
  ): Promise<T[]> {
    this.logger.log('Executing find query');

    return this.emRepository.find(filter, options);
  }

  async findById(id: string): Promise<T | null> {
    this.logger.log(`Executing findById lookup for ID: ${id}`);

    return this.emRepository.findOne({
      id,
    } as FilterQuery<T>);
  }

  async create(entityData: RequiredEntityData<T>): Promise<T> {
    this.logger.log('Persisting new entity instance to collection');

    const entity = this.emRepository.create(entityData);

    await this.em.flush();

    return entity;
  }

  async update(
    id: string,
    entityData: Partial<RequiredEntityData<T>>,
  ): Promise<T | null> {
    this.logger.log(`Updating entity resource matching ID: ${id}`);

    const entity = await this.findById(id);

    if (!entity) {
      return null;
    }

    this.em.assign(entity, entityData as any);

    await this.em.flush();

    return entity;
  }

  async delete(id: string): Promise<boolean> {
    this.logger.log(`Deleting entity resource matching ID: ${id}`);

    const entity = await this.findById(id);

    if (!entity) {
      return false;
    }

    this.em.remove(entity);

    await this.em.flush();

    return true;
  }
}
