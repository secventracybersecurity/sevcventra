import express from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);
let isInitialized = false;

export default async function handler(req: any, res: any) {
  if (!isInitialized) {
    await registerRoutes(httpServer, app);
    isInitialized = true;
  }
  return app(req, res);
}
