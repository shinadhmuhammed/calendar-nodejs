import { Application } from "express";
import express from "express";
import http from "http";
import cors from "cors";
import connectDB from "./Utils/db";
import { authRoutes } from "./Routes/AuthRoutes";

class App {
  public app: Application;
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.applyMiddleware();
    this.routes();
    connectDB();
  }

  private applyMiddleware(): void {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(
      cors({
        origin: "http://localhost:3000",
      })
    );
  }

  private routes(): void {
    this.app.use("/", authRoutes);
    this.app.use((req, res, next) => {
      res.status(500).send("Something broke!");
    });
  }

  public startServer(PORT: number): void {
    this.server.listen(PORT, () => {
      console.log(`server is running  http://localhost:${PORT}`);
    });
  }
}

export default App;
