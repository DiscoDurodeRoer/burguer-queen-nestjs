import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order, orderSchema } from './schemas/order.schema';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: orderSchema
      }
    ]),
    UsersModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule { }
