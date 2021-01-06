import { ServerSetup } from './server';
import config from 'config';

(async () => {
  const server = new ServerSetup(config.get('App.port'));
  await server.init();
  server.start();
})();
