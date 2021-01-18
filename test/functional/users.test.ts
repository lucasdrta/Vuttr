import { ServerSetup } from '../../src/server';
import request from 'supertest';
import { User } from '../../src/models/user';

let server: ServerSetup;

describe('Tools functional tests', () => {
  beforeAll(async () => {
    server = new ServerSetup();
    await server.init();

    await User.deleteMany();
  });

  afterAll(async () => {
    await server.close();
  });

  describe('When create a User', () => {
    it('Should create a new user with success', async () => {
      const user = {
        name: 'Lucas',
        email: 'lucas@mail.com',
        password: '123456',
      };

      const resposne = await request(server.getApp()).post('/users').send(user);

      expect(resposne.status).toBe(201);
      expect(resposne.body).toEqual(
        expect.objectContaining({
          ...user,
          ...{ password: expect.any(String) },
        })
      );
    });

    it('should return a error when email already exists in database', async () => {
      const user = {
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      };

      await User.create(user);

      const response = await request(server.getApp()).post('/users').send(user);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        message:
          'User validation failed: email: already exists in the database.',
      });
    });
  });
});
