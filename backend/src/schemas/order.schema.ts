import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Mixed, SchemaTypes, Types } from 'mongoose';
import { User } from './user.schema';

export type OrderDocument = Order & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Order {
  @Prop({ type: Number, required: true })
  amountPaid: number;
  @Prop({ type: Object, required: false })
  deliveryAddress: object;
  @Prop({ type: Array<Mixed>, required: true })
  orderedProducts: object[];
  @Prop({ type: String, required: false })
  paymentId: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: false })
  userId: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
