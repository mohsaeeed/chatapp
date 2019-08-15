import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as fs from 'fs';

jest.mock('fs', () => ({
  readFileSync: () => 'test.env',
}));

const OLD_ENV = process.env;
process.env = { API_AUTH_ENABLED: 'true' };

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    process.env = OLD_ENV;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/login (POST)', () => {
    return request(app.getHttpServer())
    .post('/login')
    .expect(200);
  });

});
