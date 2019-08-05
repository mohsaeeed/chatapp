import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {

  let strategy: JwtStrategy;

  beforeEach(async () => {
    strategy = new JwtStrategy();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should define valid', () => {
    expect(strategy.validate).toBeTruthy();
  });

  it('should return user object', async () => {

    const mock = {userId: '1', username: 'mohsaeeed'};
    const mockUser = {
      sub: '1',
      username: 'mohsaeeed',
      name: {
        first: 'mohammed',
        last: 'abdelrahman',
      },
      email: 'moh.saeeed@gmail.com',
      password: '12344321',
    };

    expect(await strategy.validate(mockUser)).toEqual(mock);
  });

});
