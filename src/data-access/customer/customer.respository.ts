import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseRepository } from '../base.repository';
import { Customer } from './customer.entity';
import { EntityRepository } from '@mikro-orm/mongodb';

export class CustomerRepository extends BaseRepository<Customer> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: EntityRepository<Customer>,
  ) {
    super(customerRepo);
  }

  async findActiveCustomers(page: number = 1, limit: number = 20): Promise<[Customer[], number]> {
    this.logger.log(`Fetching active customer batch: page ${page}, limit ${limit}`);
    
    return this.findAndCount(
      { isActive: true }, // Verified at compile time against Customer entity properties
      {
        limit,
        offset: (page - 1) * limit,
        orderBy: { createdAt: 'DESC' },
      }
    );
  }
}
