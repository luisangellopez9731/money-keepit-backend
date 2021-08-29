import "reflect-metadata";
import express, { json } from "express";
import cors from "cors";
import routes from "./controllers/routes";
import { createConnection } from "typeorm";
export const App = express();
createConnection()
  .then(() => {
    App.use(cors());
    App.use(json());
    App.use(routes());

    App.listen(3001, () => {
      console.log("server running in port 3001");
    });
  })
  .catch((error) => {
    console.log(error);
  });
