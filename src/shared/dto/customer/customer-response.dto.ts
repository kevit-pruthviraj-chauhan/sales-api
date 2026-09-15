import { ApiProperty } from '@nestjs/swagger';

export class CustomerResponseDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Customer unique identifier',
  })
  id!: string;

  @ApiProperty({ example: 'John Doe', description: 'Customer full name' })
  name!: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Customer email address',
  })
  email!: string;

  @ApiProperty({
    example: '+919876543210',
    required: false,
    description: 'Customer phone number',
  })
  phone?: string;

  @ApiProperty({
    example: 'Rajkot, Gujarat, India',
    required: false,
    description: 'Customer address',
  })
  address?: string;

  @ApiProperty({ example: true, description: 'Customer active status' })
  isActive!: boolean;

  @ApiProperty({
    example: '2026-09-14T10:30:00Z',
    description: 'Customer creation timestamp',
  })
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
