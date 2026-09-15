import { Entity, Property, PrimaryKey } from '@mikro-orm/decorators/legacy';
import { Product } from '../product/product.entity';

@Entity()
export class Sales {
  @PrimaryKey({ type: 'ObjectId' })
  _id: string;

  @Property({ type: 'string' })
  customer_id: string;

  @Property({ type: 'array' })
  items: Array<Product>;

  @Property({ type: 'number' })
  tax: number;

  @Property({ type: 'number' })
  notes: string;
}
