import "reflect-metadata";
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import routes from "./controllers/routes";
import { createConnection } from "typeorm";

config();
const port = parseInt(process.env.PORT || "3000");

createConnection().then(() => {
  const App = express();
  App.use(cors());
  App.use(json());
  App.use(routes());

  App.listen(port, () => {
    console.log(`server running in port ${port}`);
  });
});
