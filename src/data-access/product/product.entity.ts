import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity()
export class Product {
  @PrimaryKey()
  _id!: ObjectId;

  @Property()
  name!: string;

  @Property()
  sku!: string;

  @Property()
  price!: number;

  @Property()
  stock!: number;
}
