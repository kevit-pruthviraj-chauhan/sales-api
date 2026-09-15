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
import { Product } from '../../data-access/product/product.entity';
import { ProductUpdateDto } from '../../shared/dto/product/product-update.dto';
import { ProductCreateDto } from '../../shared/dto/product/product-create.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() product: ProductCreateDto): Promise<Product> {
    return this.productService.createProduct(product);
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
    @Body() product: ProductUpdateDto,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }
}
