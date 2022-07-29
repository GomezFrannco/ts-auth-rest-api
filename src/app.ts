require("dotenv").config()
import express, { Application } from "express";
import config from "config";
import connect from "./utils/mongoose.utils";

export class App {
  private app: Application;
  private port: string | number;
  constructor() {
    this.app = express();
    this.port = config.get('port',);
    this.settings();
    this.middlewares();
    this.routes();
    this.connection();
  }
  private settings(): void {
    this.app.set("port", this.port);
  }
  private middlewares(): void {
    this.app.use(express.json());
  }
  private routes(): void {
  }
  private connection(): Promise<void> {
    return connect();
  }
  public listen(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("server on port:", this.app.get("port"));
    });
  }
}

const server = new App().listen();
