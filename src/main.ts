import express, { json } from "express";
import cors from "cors";
import routes from "./controllers/routes";
const App = express();

App.use(cors());
App.use(json());
App.use(routes);

App.listen(3001, () => {
  console.log("server running in port 3001");
});
