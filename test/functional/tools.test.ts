import { ServerSetup } from '../../src/server';
import request from 'supertest';

let server: ServerSetup;

describe('Tools functional tests', () => {
  beforeAll(async () => {
    server = new ServerSetup();
    await server.init();
  });

  describe('When create a tool', () => {
    it('Should create a tool with success', async () => {
      const tool = {
        title: 'hotel',
        link: 'https://github.com/typicode/hotel',
        description:
          'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: [
          'node',
          'organizing',
          'webapps',
          'domain',
          'developer',
          'https',
          'proxy',
        ],
      };

      const resposne = await request(server.getApp()).post('/tools').send(tool);

      expect(resposne.status).toBe(201);
      expect(resposne.body).toEqual(expect.objectContaining(tool));
    });
  });
});
