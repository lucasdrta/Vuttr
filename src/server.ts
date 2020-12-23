import express, { Application } from 'express';
const app = express();

export class ServerSetup {
  constructor(private port = 3000) {
    this.port = port;
  }

  public async init(): Promise<void> {
    this.SetupExpress();
  }

  private SetupExpress(): void {
    app.use(express.json());
    app.use('/', (req, res) => {
      res.send('Hello');
    });
  }

  public start(): void {
    app.listen(this.port, () => {
      console.info(`Server running at http://localhost:${this.port}`);
    });
  }

  public getApp(): Application {
    return app;
  }
}
