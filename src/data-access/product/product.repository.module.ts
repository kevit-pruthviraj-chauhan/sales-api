import { Injectable } from '@nestjs/common';
import { Product } from '../../data-access/product/product.entity';
import { BaseRepository } from '../base.repository';
import { EntityRepository } from '@mikro-orm/mongodb';
import { ProductUpdateDto } from '../../shared/dto/product/product-update.dto';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly repo: EntityRepository<Product>,
  ) {
    super(repo);
  }

  async createProduct(data: RequiredEntityData<Product>): Promise<Product> {
    const product = this.em.create(Product, data);
    this.em.persist(product);
    await this.em.flush();
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.em.find(Product, {});
  }

  async findOne(id: string): Promise<Product | null> {
    return await this.em.findOne(Product, id);
  }

  async update(id: string, data: ProductUpdateDto): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    product.name = data.name;
    product.price = data.price;
    await this.em.flush();
    return product;
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    this.em.remove(product);
    await this.em.flush();
  }
}
