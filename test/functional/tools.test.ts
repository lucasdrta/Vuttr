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
    it('should return error when field is missing', async () => {
      const tool = {
        link: 'https://somelink.com',
        description: 'Any description',
        tags: ['node', 'Test', 'Jest'],
      };

      const resposne = await request(server.getApp()).post('/tools').send(tool);

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

      const tool = new Tool(mockTool);
      await tool.save();

      const response = await request(server.getApp()).delete(`/tools/${tool.id}`);

      expect(response.status).toBe(204);
    });

    it('should return error when tool id not exists', async () => {
      const response = await request(server.getApp()).delete('/tools/some-id');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        message: 'Cast to ObjectId failed for value \"some-id\" at path \"_id\" for model \"Tool\"'
      });
    })
  }
});
