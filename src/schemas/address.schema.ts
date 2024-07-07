import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ strict: 'throw', _id: false })
export class Address {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  state: string;
  @Prop({ type: String, required: true })
  country: string;
  @Prop({ type: Number, required: true })
  pinCode: number;
}
