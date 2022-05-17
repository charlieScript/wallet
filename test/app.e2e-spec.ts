import { INestApplication, ParseUUIDPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UUIDVersion } from 'class-validator';
import { type } from 'os';
import { SignInInput } from 'src/auth/dto/sign-in-input.dto';
import { SignUpInput } from 'src/auth/dto/sign-up-input.dto';
import { User } from 'src/typeorm/entities/users.entity';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('POST /api/auth/signup', async () => {
  //   const input: SignUpInput = {
  //     name: 'a',
  //     email: 'a@a.com',
  //     password: 'aaaaaaaa',
  //   };
  //   await request(app.getHttpServer())
  //     .post('/api/auth/signup')
  //     .send(input)
  //     .expect(201);
  // });

  it('POST /api/auth/signin', async () => {
    const input: SignInInput = {
      email: 'a',
      password: 'aaaaaaaa',
    };
    const res = await request(app.getHttpServer())
      .post('/api/auth/signin')
      .send(input)
      .expect(201);
    token = res.body.token as string;
    expect(token).toMatchSnapshot()
  });

  it('GET /api/users', async () => {
    const users = await request(app.getHttpServer())
      .get('/api/users')
      .expect(200);
    expect(users.body).toMatchObject<User[]>(users.body);
  });

  it('GET /api/users/a', async () => {
    const user = await request(app.getHttpServer())
      .get('/api/users/a')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
    expect(user.body.name).toBe('a');
  });
});
