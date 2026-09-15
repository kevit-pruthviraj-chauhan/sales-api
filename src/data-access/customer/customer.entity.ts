import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
  Index,
} from '@mikro-orm/decorators/legacy';

import { ObjectId } from '@mikro-orm/mongodb';
import { Opt } from '@mikro-orm/core';

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
  isActive: boolean & Opt = true;

  @Property()
  createdAt: Date & Opt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date & Opt = new Date();
}
