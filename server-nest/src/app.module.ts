import { ConfigService } from './core/config/config-service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './core/config/config.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
    ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
