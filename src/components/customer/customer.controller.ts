import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';

import { type RequiredEntityData } from '@mikro-orm/mongodb';
import { CustomerService } from './customer.service';
import { Customer } from '../../data-access/customer';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customersService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: RequiredEntityData<Customer>): Promise<Customer> {
    return this.customersService.create(dto);
  }

  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ) {
    return this.customersService.findAll(page ?? 1, limit ?? 20);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Customer> {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<RequiredEntityData<Customer>>,
  ): Promise<Customer> {
    return this.customersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Success deactivation returns clean 204 response
  async remove(@Param('id') id: string): Promise<void> {
    return this.customersService.remove(id);
  }
}
