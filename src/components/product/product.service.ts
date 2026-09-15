import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../data-access/product/product.entity';
import { ProductRepository } from '../../data-access/product/product.repository.module';
import { ProductUpdateDto } from '../../shared/dto/product/product-update.dto';
import { ProductCreateDto } from '../../shared/dto/product/product-create.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async createProduct(data: ProductCreateDto): Promise<Product> {
    return await this.productRepo.createProduct(data);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepo.findAll();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async update(id: string, data: ProductUpdateDto): Promise<Product> {
    return await this.productRepo.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.productRepo.remove(id);
  }
}
