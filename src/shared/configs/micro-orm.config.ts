import { defineConfig } from '@mikro-orm/mongodb';
import { Product } from '../../data-access/product/product.entity';

export default defineConfig({
  clientUrl: process.env.MONGODB_URL,
  dbName: 'demo',
  entities: [Product],
});
