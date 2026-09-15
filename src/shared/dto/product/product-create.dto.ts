import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  @ApiProperty({ name: 'name', example: 'Product 1' })
  name!: string;

  @IsNumber()
  @ApiProperty({ name: 'price', example: 100 })
  price!: number;

  @IsString()
  @ApiProperty({ name: 'sku', example: 'SKU123' })
  sku!: string;

  @IsNumber()
  @ApiProperty({ name: 'stock', example: 10 })
  stock!: number;
}
