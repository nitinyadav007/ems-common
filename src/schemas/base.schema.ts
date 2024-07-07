import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ strict: 'throw', _id: false })
export class BaseSchema {
  declare id: string;
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  createdBy: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  updatedBy: Types.ObjectId;
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ type: Date, default: Date.now })
  deletedAt: Date;
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}
