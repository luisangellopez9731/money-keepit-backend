import "reflect-metadata";
import cors from "cors";
import routes from "./routes";
import { config } from "dotenv";
import express, { json } from "express";
import { createConnection } from "connection";

config();
const port = parseInt(process.env.PORT || "3001");

console.log("Creating Connection");
createConnection().then(async () => {
  console.log("Connection created");

  const App = express();
  App.use(cors());
  App.use(json());
  App.use(await routes());

  App.listen(port, () => {
    console.log(`server running in port ${port}`);
  });
});
