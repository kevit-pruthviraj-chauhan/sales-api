import {
  Entity,
  Property,
  PrimaryKey,
  ManyToOne,
} from '@mikro-orm/decorators/legacy';
import { Product } from '../product/product.entity';
import { Customer } from '../customer/customer.entity';

@Entity()
export class Sales {
  @PrimaryKey({ type: 'ObjectId' })
  _id: string;

  @ManyToOne(() => Customer, { ref: true })
  customer: Customer;

  @Property({ type: 'array' })
  items: Array<Product>;

  @Property({ type: 'number' })
  tax: number;

  @Property({ type: 'string' })
  notes: string;
}
