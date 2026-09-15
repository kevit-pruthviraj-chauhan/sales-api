import { OmitType, PartialType } from '@nestjs/swagger';
import { CustomerCreateDto } from './customer-create.dto';

export class CustomerUpdateDto extends PartialType(
  OmitType(CustomerCreateDto, ['email'] as const),
) {}
