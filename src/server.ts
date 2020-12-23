import express, { Application } from 'express';
import * as database from './database';
import routes from './routes';
const app = express();

export class ServerSetup {
  constructor(private port = 3000) {
    this.port = port;
  }

  public async init(): Promise<void> {
    this.SetupExpress();
    await this.databaseSetup();
  }

  private SetupExpress(): void {
    app.use(express.json());
    app.use(routes);
  }

  public start(): void {
    app.listen(this.port, () => {
      console.info(`Server running at http://localhost:${this.port}`);
    });
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return app;
  }
}
