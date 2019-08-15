import { ConfigService } from './core/config/config-service';
import { ConfigModule } from './core/config/config.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { LocalStrategy } from './core/auth/local.strategy';
import { UsersService } from './modules/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './core/auth/constants';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './modules/users/schemas/user.schems';
import * as fs from 'fs';
import { User } from './core/models/user';

jest.mock('./core/config/config-service');

jest.mock('fs', () => ({
  readFileSync: () => 'environments/test.env',
}));

const OLD_ENV = process.env;
process.env = { API_AUTH_ENABLED: 'true' };

describe('AppController', () => {
  let appController: AppController;
  let jwt: JwtService;
  let appService: AppService;
  let configService: ConfigService;
  jest.mock('./modules/users/schemas/user.schems.ts');

  beforeEach(async () => {

    process.env = OLD_ENV;

    const userModel = {
      username: 'mohsaeeed',
      password: '12344321',
      name: {
        first: 'Mohammed',
        last: 'Abdelrahman',
      },
      email: 'moh.saeeed@gmail.com',
    } as User;
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        UsersModule,
        PassportModule,
        AuthModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema, collection: 'User' }]),
        ConfigModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        })],
      providers: [AppService, UsersService, AuthService,
        {
          provide: ConfigService,
          useValue: new ConfigService(`environments/test.env`),
        },
        {
          provide: getModelToken('User'),
          useValue: userModel,
        }],
    }).compile();
    configService = app.get<ConfigService>(ConfigService);
    configService.initValidation = jest.fn().mockImplementation(() => {
      return Object.assign(process.env, { API_AUTH_ENABLED: 'true' });
    });
    appController = app.get<AppController>(AppController);
    jwt = app.get<JwtService>(JwtService);

    appService = app.get<AppService>(AppService);
  });

  describe('app', () => {

    it('should defind login', () => {
      expect(appController.login(null)).toBeTruthy();
    });

    it('should defind getProfile', () => {
      expect(appController.getProfile({ user: true })).toBeTruthy();
    });

  });

});
