import { ServerSetup } from '../../src/server';
import request from 'supertest';
import { Tool } from '../../src/models/tools';
import { User } from '../../src/models/user';
import AuthService from '../../src/services/auth';

let server: ServerSetup;

describe('Tools functional tests', () => {
  const defaultUser = {
    name: 'John Doe',
    email: 'john@mail.com',
    password: '1234',
  };
  let token: string;

  beforeAll(async () => {
    server = new ServerSetup();
    await server.init();

    await User.deleteMany();
    await Tool.deleteMany();

    const user = await new User(defaultUser).save();
    token = AuthService.generateToken(user.toJSON());
  });

  afterAll(async () => {
    await server.close();
  });

  describe('When create a tool', () => {
    it('Should create a tool with success', async () => {
      const tool = {
        title: 'Some Title',
        link: 'https://somelink.com',
        description: 'Any description',
        tags: ['node', 'Test', 'Jest'],
      };

      const resposne = await request(server.getApp())
        .post('/tools')
        .set({ 'x-access-token': token })
        .send(tool);

      expect(resposne.status).toBe(201);
      expect(resposne.body).toEqual(expect.objectContaining(tool));
    });
    it('should return error when field is missing', async () => {
      const tool = {
        link: 'https://somelink.com',
        description: 'Any description',
        tags: ['node', 'Test', 'Jest'],
      };

      const resposne = await request(server.getApp())
        .post('/tools')
        .set({ 'x-access-token': token })
        .send(tool);

      expect(resposne.status).toBe(400);
      expect(resposne.body).toEqual({
        code: 400,
        message: 'Tool validation failed: title: Path `title` is required.',
      });
    });
  });

  describe('When delete a tool', () => {
    it('should be able to delete a tool with your id', async () => {
      const mockTool = {
        title: 'Some Title',
        link: 'https://somelink.com',
        description: 'Any description',
        tags: ['node', 'Test', 'Jest'],
      };

      const mockUser = {
        name: 'John Doe',
        email: 'john@mockmail.com',
        password: '1234',
      };

      const user = await User.create(mockUser);

      const tool = await Tool.create({ ...mockTool, ...{ user: user.id } });

      const response = await request(server.getApp())
        .delete(`/tools/${tool.id}`)
        .set({ 'x-access-token': token });

      expect(response.status).toBe(204);
    });

    it('should return error when tool id not exists', async () => {
      const response = await request(server.getApp())
        .delete('/tools/some-id')
        .set({ 'x-access-token': token });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        message:
          'Cast to ObjectId failed for value "some-id" at path "_id" for model "Tool"',
      });
    });
  });
});
