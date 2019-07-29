import { JwtService } from '@nestjs/jwt';
import { User } from '../models/user';
import { UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  const userService = new UsersService();
  const jwtService = new JwtService({});
  const authService = new AuthService(userService, jwtService);
  const localStrategy = new LocalStrategy(authService);

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  it('shoud have a function validate', () => {
    expect(localStrategy.validate).toBeDefined();
  });

  it('should throw UnauthrizedException is user is not valid', async () => {
    let exception;
    try {
      await localStrategy.validate('', '');
    } catch (e) {
      exception = e;
    }

    expect(JSON.stringify(exception)).toMatch(JSON.stringify(new UnauthorizedException()));
  });

  it('should return a user if the user is valid', async () => {

    const user = await localStrategy.validate('mohsaeeed', '12344321') as User;

    expect(user.username).toEqual('mohsaeeed');

  });
});
