import { Inject, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order-dto';
import { Model } from 'mongoose';
import { IOrder } from './interfaces/order.interface';
import { UsersService } from '../users/users.service';
import * as moment from 'moment';
import { Order } from './schemas/order.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        private userService: UsersService
    ) { }

    async createOrder(order: OrderDto) {

        let total = 0;

        for (const quantityProduct of order.products) {
            let priceProduct = quantityProduct.product.price;
            const extras = quantityProduct.product.extras;
            if (quantityProduct.product.extras) {
                for (const extra of extras) {

                    const extraSelected = extra.options.find(op => op.selected);

                    if (extraSelected) {
                        priceProduct += extraSelected.price;
                    }
                }
            }
            total += quantityProduct.quantity * priceProduct;
        }

        const user = await this.userService.findUserbyEmail(order.user.email);

        const startOfDay = moment(new Date()).startOf('day').toDate();
        const endOfDay = moment(new Date()).endOf('day').toDate();

        const ticket = await this.orderModel.countDocuments({
            date: {
                $gte: startOfDay,
                $lte: endOfDay,    // Fecha menor o igual al fin del día
            },
        });

        delete user.password;

        const orderModel = new this.orderModel({
            products: order.products,
            user,
            address: order.address,
            date: new Date(),
            total: +total.toFixed(2),
            ticket: ticket + 1
        });
        return orderModel.save()
    }

}
