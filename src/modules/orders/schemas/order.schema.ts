import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Order {
  
  @Prop({ required: false })
  address?: string;

  @Prop({ default: new Date() })
  date: Date;

  @Prop({ required: true })
  total: number;

  @Prop({ type: [Object], required: true })
  products: object[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: false })
  ticket?: number;
}

export const orderSchema = SchemaFactory.createForClass(Order);