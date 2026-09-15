import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../data-access/sales/sales.repository.module';
import { SalesCreateDto } from '../../shared/dto/sales/sales-create.dto';
import { SalesUpdateDto } from '../../shared/dto/sales/sales-update.dto';

@Injectable()
export class SalesService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(data: SalesCreateDto) {
    return await this.productRepository.createSales(data);
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async findOne(id: string) {
    return await this.productRepository.findOne(id);
  }

  async update(id: string, data: SalesUpdateDto) {
    return await this.productRepository.update(id, data);
  }

  async remove(id: string) {
    return await this.productRepository.remove(id);
  }
}
