import express from "express";
import conectarDB from "./../../config/mongo.js";
import allRoutes from "../routes/index.js";
import cors from "cors";

class Server {
  constructor(){
    this.port = process.env.PORT;
    this.app = express();
    this.routesV1 = '/api';
    this.middlewares();
    this.connectDatabase();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json());
    this.app.use(cors());
  }

  async connectDatabase(){
    await conectarDB();
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    })
  }

  routes(){
    this.app.use(this.routesV1, allRoutes);
  }
}

export default Server;