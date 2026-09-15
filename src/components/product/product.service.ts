import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product, ProductRepository } from '../../data-access/product';
import { ProductCreateDto } from '../../shared/dto/product/product-create.dto';
import { ProductUpdateDto } from '../../shared/dto/product/product-update.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(dto: ProductCreateDto): Promise<Product> {
    const existing = await this.productRepository.findBySku(dto.sku);

    if (existing) {
      throw new ConflictException(
        `Product with SKU "${dto.sku}" already exists`,
      );
    }

    return this.productRepository.create({
      name: dto.name,
      price: dto.price,
      sku: dto.sku,
      stock: dto.stock,
    });
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({});
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }

    return product;
  }

  async update(id: string, dto: ProductUpdateDto): Promise<Product> {
    const product = await this.findOne(id);

    await this.productRepository.update(id, dto);

    return product;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.productRepository.delete(id);

    if (!deleted) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }
}
