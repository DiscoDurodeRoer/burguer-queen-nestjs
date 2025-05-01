import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Mixed, Types } from 'mongoose';

@Schema()
export class Product {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  img: string;

  @Prop({ type: Object,  required: false })
  extras?: Object;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;
}

export const productSchema = SchemaFactory.createForClass(Product);
