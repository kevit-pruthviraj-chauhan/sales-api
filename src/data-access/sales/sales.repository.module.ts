import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Sales } from './sales.entity';
import { SalesCreateDto } from '../../shared/dto/sales/sales-create.dto';
import { SalesUpdateDto } from '../../shared/dto/sales/sales-update.dto';
import { Customer } from '../customer';

@Injectable()
export class ProductRepository {
  constructor(private readonly em: EntityManager) {}

  async createSales(data: SalesCreateDto): Promise<Sales> {
    const customerRef = this.em.getReference(Customer, data.customer_id);

    const sales = new Sales();
    sales.customer = customerRef;
    sales.items = data.items;
    sales.tax = data.tax;
    sales.notes = data.notes;
    this.em.persist(sales);
    await this.em.flush();
    return sales;
  }

  async findAll(): Promise<Sales[]> {
    return await this.em.find(Sales, {});
  }

  async findOne(id: string): Promise<Sales | null> {
    return await this.em.findOne(Sales, id);
  }

  async update(id: string, data: SalesUpdateDto): Promise<Sales> {
    const sales = await this.findOne(id);
    if (!sales) {
      throw new Error('Sales not found');
    }
    const customerRef = this.em.getReference(Customer, data.customer_id);

    sales.customer = customerRef;
    sales.items = data.items;
    sales.tax = data.tax;
    sales.notes = data.notes;
    await this.em.flush();
    return sales;
  }

  async remove(id: string): Promise<void> {
    const sales = await this.findOne(id);
    if (!sales) {
      throw new Error('Sales not found');
    }
    this.em.remove(sales);
    await this.em.flush();
  }
}
