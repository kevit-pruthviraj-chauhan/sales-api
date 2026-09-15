import { Entity, Property, PrimaryKey } from '@mikro-orm/decorators/legacy';

@Entity()
export class Product {
  @PrimaryKey({ type: 'ObjectId' })
  _id: string;

  @Property({ type: 'string' })
  name: string;

  @Property({ type: 'string' })
  sku: string;

  @Property({ type: 'number' })
  price: number;

  @Property({ type: 'number' })
  stock: number;
}
