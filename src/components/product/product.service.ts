import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../../data-access/product/product.entity';
import { ProductRepository } from '../../data-access/product/product.repository.module';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async createProduct(
    name: string,
    price: number,
    sku: string,
    stock: number,
  ): Promise<Product> {
    return await this.productRepo.createProduct(name, price, sku, stock);
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

  async update(id: string, name: string, price: number): Promise<Product> {
    const product = await this.findOne(id);
    product.name = name;
    product.price = price;
    await this.productRepo.update(id, name, price);
    return product;
  }

  async remove(id: string): Promise<void> {
    await this.productRepo.remove(id);
  }
}
