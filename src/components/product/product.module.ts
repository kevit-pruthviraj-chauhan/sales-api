import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from '../../data-access/product/product.repository.module';
import { Product } from '../../data-access/product/product.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
  imports: [MikroOrmModule.forFeature([Product])],
})
export class ProductModule {}
