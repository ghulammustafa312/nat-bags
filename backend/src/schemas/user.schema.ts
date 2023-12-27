import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { USER_ROLE } from 'src/constants/enums';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class User {
  @Prop({ required: true, type: String })
  firstName: string;
  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, type: String })
  password: string;

  @Prop({ type: Array<Address>, required: false })
  addresses: Address[];

  @Prop({ required: false, enum: USER_ROLE, default: USER_ROLE.USER })
  role: string;

  @Prop({ required: true, type: String })
  phoneNo: string;
}

@Schema()
export class Address {
  @Prop({ required: true, type: String })
  addressLine1: string;

  @Prop({ required: false, type: String })
  addressLine2: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  state: string;

  @Prop({ required: true, type: String })
  country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
