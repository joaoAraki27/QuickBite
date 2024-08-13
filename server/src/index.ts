// src/index.js
import express, { Express, Request,  Response } from "express";
import dotenv from "dotenv";
import router from "./Routes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//app use
app.use(express.json());
app.use(cors());
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello! The server is running smoothly');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});