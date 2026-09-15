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
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  @Index({ options: { unique: true } })
  email!: string;

  @Property({ nullable: true })
  phone?: string;

  @Property({ nullable: true })
  address?: string;

  @Property({ default: true })
  isActive: boolean = true;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
