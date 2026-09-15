import { Entity, Property, PrimaryKey } from '@mikro-orm/decorators/legacy';

@Entity()
export class Product {
  @PrimaryKey()
  _id!: string;

  @Property()
  name!: string;

  @Property()
  sku!: string;

  @Property()
  price!: number;

  @Property()
  stock!: number;
}
