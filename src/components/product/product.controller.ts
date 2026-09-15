import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { Product } from '../../data-access/product';
import { ProductCreateDto } from '../../shared/dto/product/product-create.dto';
import { ProductUpdateDto } from '../../shared/dto/product/product-update.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() dto: ProductCreateDto): Promise<Product> {
    return this.productService.create(dto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: ProductUpdateDto,
  ): Promise<Product> {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.productService.remove(id);
  }
}
