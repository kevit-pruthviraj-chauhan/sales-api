import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesCreateDto } from '../../shared/dto/sales/sales-create.dto';
import { SalesUpdateDto } from '../../shared/dto/sales/sales-update.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  createSales(@Body() data: SalesCreateDto) {
    return this.salesService.create(data);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: SalesUpdateDto) {
    return this.salesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(id);
  }
}
