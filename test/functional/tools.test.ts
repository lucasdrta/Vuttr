import { ServerSetup } from '../../src/server';
import request from 'supertest';
import { Tool } from '../../src/models/tools';

let server: ServerSetup;

describe('Tools functional tests', () => {
  beforeAll(async () => {
    server = new ServerSetup();
    await server.init();

    await Tool.deleteMany();
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

      const resposne = await request(server.getApp()).post('/tools').send(tool);

      expect(resposne.status).toBe(201);
      expect(resposne.body).toEqual(expect.objectContaining(tool));
    });
  });
});
