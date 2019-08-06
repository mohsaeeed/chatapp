import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/core/models/user';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersService', () => {
  let service: UsersService;
  jest.mock('./schemas/user.schems.ts');

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
      providers: [UsersService,
        {
          provide: getModelToken('User'),
          useValue: userModel,
        }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return undefind for calling findOne', () => {
    expect(service.findOne).toBeTruthy();
  });

});
