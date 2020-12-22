import { ServerSetup } from './server';

(async () => {
  const server = new ServerSetup();
  await server.init();
  server.start();
})();
