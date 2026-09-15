import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Product } from '../../../data-access/product/product.entity';

export class SalesCreateDto {
  @IsString()
  @ApiProperty({ name: 'customer_id', example: 'Customer 1' })
  customer_id: string;

  @IsNumber()
  @ApiProperty({ name: 'tax', example: 100 })
  tax: number;

  @IsString()
  @ApiProperty({ name: 'sku', example: 'SKU123' })
  notes: string;

  @IsArray()
  @ApiProperty({ name: 'stock', example: 10 })
  items: Array<Product>;
}
