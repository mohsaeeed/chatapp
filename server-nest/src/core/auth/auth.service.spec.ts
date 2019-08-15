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

jest.mock('fs', () => ({
  readFileSync: () => 'test.env',
}));

jest.mock('./../../modules/users/schemas/user.schems.ts');

describe('AuthService', () => {

  let service: AuthService;
  let jwt: JwtService;

  beforeEach(async () => {

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser should be defind', () => {
    expect(service.validateUser).toBeDefined();
  });

  it('should return a null value for non-valid users', async () => {
    expect(await service.validateUser('mohsaeeed', '12345678')).toBeNull();
  });

  it('should return a user object for valid users', async () => {

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
    expect(service.login).toBeTruthy();
  });

  it('should return a token object', async () => {
    const user = { username: 'mohsaeeed', userid: '1' };
    const token = await service.login(user);
    expect(token).toHaveProperty('access_token');
  });

});
