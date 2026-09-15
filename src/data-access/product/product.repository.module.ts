import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Product } from './product.entity';

@Injectable()
export class ProductRepository {
  constructor(private readonly em: EntityManager) {}

  async createProduct(
    name: string,
    price: number,
    sku: string,
    stock: number,
  ): Promise<Product> {
    const product = new Product();
    product.name = name;
    product.price = price;
    product.sku = sku;
    product.stock = stock;
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

  async update(id: string, name: string, price: number): Promise<Product> {
    const product = await this.findOne(id);
    if (!product) {
      throw new Error('Product not found');
    }
    product.name = name;
    product.price = price;
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
