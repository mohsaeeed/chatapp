import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/core/models/user';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return undefind for calling findOne', () => {
    expect(service.findOne).toBeTruthy();
  });

  it('should return object of type user', async () => {
    const user = {} as User;
    expect(await service.findOne('mohsaeeed')).toMatchObject(user);
  });

  it('should return user object matching the passed username', async () => {
    const username = 'mohsaeeed';
    const user = await service.findOne(username);

    expect(user.username).toEqual(username);

  });

});
