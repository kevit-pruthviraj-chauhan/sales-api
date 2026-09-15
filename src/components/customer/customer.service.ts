import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { RequiredEntityData } from '@mikro-orm/mongodb';
import { createLogger } from '../../common/logger';
import { Customer, CustomerRepository } from '../../data-access/customer';

@Injectable()
export class CustomerService {
  private readonly logger = createLogger(CustomerService.name);

  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(dto: RequiredEntityData<Customer>): Promise<Customer> {
    this.logger.log(
      `Initiating registration flow for customer email: ${dto.email}`,
    );

    // Business rule: Enforce unique email checks before persistence
    const [existing] = await this.customerRepository.findAndCount({
      email: dto.email,
    });
    if (existing.length > 0) {
      this.logger.warn(
        `CUSTOMER_CONFLICT: Registration failed. Email already exists: ${dto.email}`,
      );
      throw new ConflictException({
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'A customer with this email address already exists',
      });
    }

    return this.customerRepository.create(dto);
  }

  async findAll(page: number = 1, limit: number = 20) {
    this.logger.log(
      `Fetching paginated active customers catalog: Page ${page}, Limit ${limit}`,
    );
    const [data, total] = await this.customerRepository.findActiveCustomers(
      page,
      limit,
    );

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Customer> {
    this.logger.log(`Looking up customer record: ${id}`);
    const customer = await this.customerRepository.findById(id);

    // Business rule: Check if customer exists AND is active
    if (!customer?.isActive) {
      this.logger.warn(
        `CUSTOMER_NOT_FOUND: Record missing or inactive for ID: ${id}`,
      );
      throw new NotFoundException({
        statusCode: 404,
        code: 'CUSTOMER_NOT_FOUND',
        message: `Customer with ID ${id} not found`,
      });
    }

    return customer;
  }

  async update(
    id: string,
    dto: Partial<RequiredEntityData<Customer>>,
  ): Promise<Customer> {
    this.logger.log(`Executing patch update transaction on customer ID: ${id}`);

    // Ensure the customer exists before attempting update actions
    await this.findOne(id);

    const updatedCustomer = await this.customerRepository.update(id, dto);
    if (!updatedCustomer) {
      throw new NotFoundException({
        statusCode: 404,
        code: 'CUSTOMER_NOT_FOUND',
        message: `Customer with ID ${id} not found`,
      });
    }
    return updatedCustomer;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(
      `Processing safe deactivation workflow for customer ID: ${id}`,
    );
    const wasDeleted = await this.customerRepository.delete(id);

    if (!wasDeleted) {
      this.logger.warn(`CUSTOMER_NOT_FOUND: Soft-delete failed for ID: ${id}`);
      throw new NotFoundException({
        statusCode: 404,
        code: 'CUSTOMER_NOT_FOUND',
        message: `Customer with ID ${id} not found`,
      });
    }
  }
}
