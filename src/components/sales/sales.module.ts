import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ProductRepository } from '../../data-access/sales/sales.repository.module';

@Module({
  providers: [SalesService, ProductRepository],
  controllers: [SalesController],
})
export class SalesModule {}
