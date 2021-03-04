import express from "express";
import { Request, Response } from "express";

const server = express();
const PORT = 8080;
server.get("/", (req: Request, res: Response) => {
  res.send('Hello This is server of My Project Yeah!! TypeScript + Express + Nodemon')
});

server.listen(PORT, () => {
  console.log(`Server is running at https://localhost:${PORT}`);
});

