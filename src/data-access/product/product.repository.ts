import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base.repository';
import { Product } from './product.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mongodb';

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: EntityRepository<Product>,
  ) {
    super(productRepo);
  }

  async findBySku(sku: string): Promise<Product | null> {
    return this.productRepo.findOne({ sku });
  }
}
