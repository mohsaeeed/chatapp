import { ConfigModule } from './config.module';
import { Module } from '@nestjs/common';
import { ConfigService } from './config-service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import * as fs from 'fs';

jest.mock('./config-service');

jest.mock('fs', () => ({
    readFileSync: () => 'test.env',
}));

describe('ConfigService', () => {

    let service: ConfigService;

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
            imports: [ConfigModule],
            providers: [ConfigService, {
                provide: getModelToken('User'),
                useValue: userModel,
              }],
        }).compile();
        service = module.get<ConfigService>(ConfigService);
        service.initValidation = jest.fn().mockImplementation(() => {
            return Object.assign(process.env, { API_AUTH_ENABLED: 'true' });
        });
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
