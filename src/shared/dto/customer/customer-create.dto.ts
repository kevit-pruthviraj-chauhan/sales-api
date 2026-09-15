import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomerCreateDto {
  @ApiProperty({ example: 'John Doe', description: 'Customer full name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Customer email address (unique)',
  })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    example: '+919876543210',
    description: 'Customer phone number',
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  phone?: string;

  @ApiPropertyOptional({
    example: 'Rajkot, Gujarat, India',
    description: 'Customer address',
  })
  @IsOptional()
  @IsString()
  address?: string;
}
