import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

@Schema({ timestamps: true })
export class User {

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    address?: string;

}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre<User>('save', async function () {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
});
