import { Module } from '@nestjs/common';
import { CategoriesModule } from './modules/categories/categories.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PopulateModule } from './modules/populate/populate.module';
import { ProductsModule } from './modules/products/products.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationMongo from './configuration/configuration-mongo';
import { MongooseModule } from '@nestjs/mongoose';
import configurationAuth from './configuration/configuration-auth';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'images'),
      serveRoot: '/images',
    }),
    ConfigModule.forRoot({
      load: [configurationMongo, configurationAuth],
      isGlobal: true,
      envFilePath: `./env/${process.env.NODE_ENV}.env`
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('mongo.host')}${configService.get('mongo.port') ? ':' + configService.get('mongo.port') : ''}/${configService.get('mongo.database')}`
      })
    }),
    CategoriesModule,
    OrdersModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    StripeModule,
    PopulateModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
