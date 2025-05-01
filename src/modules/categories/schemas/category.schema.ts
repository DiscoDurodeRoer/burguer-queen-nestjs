import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  img?: string;
}

export const categorySchema = SchemaFactory.createForClass(Category);
