import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Mixed } from 'mongoose';
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

  @Prop({ type: Array<Address>, required: false, default: [] })
  addresses: Address[];

  @Prop({ required: false, enum: USER_ROLE, default: USER_ROLE.USER })
  role: string;

  @Prop({ required: true, type: String })
  phoneNo: string;
  @Prop({ required: false, default: [], type: Array<Mixed> })
  cart: object[];
  @Prop({ required: false, default: [], type: Array<Mixed> })
  wishlist: object[];
}

@Schema()
export class Address {
  @Prop({ required: true, type: String })
  street: string;

  @Prop({ required: false, type: String })
  pincode: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  state: string;

  @Prop({ required: true, type: String })
  country: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
