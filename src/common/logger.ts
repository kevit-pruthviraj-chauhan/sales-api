import { Logger } from '@nestjs/common';

// Named instances for clear categorization in your terminal logs
export const dbLogger = new Logger('MikroORM');
export const httpLogger = new Logger('HTTP');
export const appLogger = new Logger('Application');

/**
 * Helper function to generate a scoped context logger for your services/controllers.
 * Example: const logger = createLogger('CustomersService');
 */
export const createLogger = (context: string) => new Logger(context);
