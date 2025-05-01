import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from './strategy/jwt-strategy/jwt-strategy.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('auth.secretKey'),
          signOptions: { expiresIn: configService.get('auth.expiresIn') }
        }
      },
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategyService
  ]
})
export class AuthModule {}
