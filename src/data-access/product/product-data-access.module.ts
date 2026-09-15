import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class ProductDataAccessModule {}
