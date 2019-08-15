import { AppModule } from './../../app.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UsersModule } from './../../modules/users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../models/user';
import { UsersService } from './../../modules/users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import * as fs from 'fs';

const MOCK_FILE = {
  test: '',
};

const OLD_ENV = process.env;

jest.mock('fs', () => ({
  readFileSync: () => 'test.env',
}));

jest.mock('./../../modules/users/schemas/user.schems.ts');

describe('AuthService', () => {

  let service: AuthService;
  let jwt: JwtService;

  beforeEach(async () => {

    jest.resetModules();
    process.env = {...OLD_ENV};
    delete process.env.NODE_ENV;

    const userModel = {
      username: 'mohsaeeed',
      password: '12344321',
      name: {
        first: 'Mohammed',
        last: 'Abdelrahman',
      },
      email: 'moh.saeeed@gmail.com',
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        AppModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        })],
      providers: [AuthService, UsersService,
        {
          provide: getModelToken('User'),
          useValue: userModel,
        }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwt = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should be defined', () => {
    process.env.NODE_ENV = 'test';
    process.env.API_AUTH_ENABLED = 'true';
    expect(service).toBeDefined();
  });

  it('validateUser should be defind', () => {
    process.env.NODE_ENV = 'test';
    process.env.API_AUTH_ENABLED = 'true';
    expect(service.validateUser).toBeDefined();
  });

  it('should return a null value for non-valid users', async () => {
    process.env.NODE_ENV = 'test';
    process.env.API_AUTH_ENABLED = 'true';
    expect(await service.validateUser('mohsaeeed', '12345678')).toBeNull();
  });

  it('should return a user object for valid users', async () => {
    process.env.NODE_ENV = 'test';
    process.env.API_AUTH_ENABLED = 'true';

    const mockUser = {
      username: 'mohsaeeed',
      name: {
        first: 'mohammed',
        last: 'abdelrahman',
      },
      email: 'moh.saeeed@gmail.com',
      password: '12344321',
    } as User;

    const user = await service.validateUser('mohsaeeed', '12344321') as User;

    expect(user.username).toEqual(mockUser.username);
  });

  it('should defind login', async () => {
    process.env.NODE_ENV = 'test';
    process.env.API_AUTH_ENABLED = 'true';
    expect(service.login).toBeTruthy();
  });

  it('should return a token object', async () => {
    process.env.NODE_ENV = 'test';
    process.env.API_AUTH_ENABLED = 'true';
    const user = { username: 'mohsaeeed', userid: '1' };
    const token = await service.login(user);
    expect(token).toHaveProperty('access_token');
  });

});
