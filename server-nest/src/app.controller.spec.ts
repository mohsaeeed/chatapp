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

describe('AppController', () => {
  let appController: AppController;
  let jwt: JwtService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      })],
      providers: [AppService, UsersService, AuthService],
    }).compile();

    appController = app.get<AppController>(AppController);
    jwt = app.get<JwtService>(JwtService);
  });

  describe('app', () => {
    it('should defind login', () => {
      expect(appController.login(null)).toBeTruthy();
    });

    it('should defind getProfile', () => {
      expect(appController.getProfile({user: true})).toBeTruthy();
    });

  });

});
