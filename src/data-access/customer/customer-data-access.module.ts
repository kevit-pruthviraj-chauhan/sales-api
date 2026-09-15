import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.respository';

@Module({
  imports: [MikroOrmModule.forFeature([Customer])],
  providers: [CustomerRepository],
  exports: [CustomerRepository],
})
export class CustomerDataAccessModule {}
