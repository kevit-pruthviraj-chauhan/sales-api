import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  Index,
} from '@mikro-orm/decorators/legacy';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity({ collection: 'customers' })
export class Customer {
  // 1. Primary Key Duality (Database ObjectId vs Frontend API string)
  @PrimaryKey()
  _id!: ObjectId;

  // this is _id only but serialized so that frontend has easy way to manage _id as string not object
  @SerializedPrimaryKey()
  id!: string;

  // 2. Core Fields matching API specs
  @Property()
  name!: string;

  @Property()
  @Index({ options: { unique: true } }) // Ensures no duplicate customer emails at database level
  email!: string;

  @Property({ nullable: true })
  phone?: string;

  @Property({ nullable: true })
  address?: string;

  // 3. Status handling (for the DELETE/deactivate specification)
  @Property({ default: true })
  isActive: boolean = true;

  // 4. Operational Auditing
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
