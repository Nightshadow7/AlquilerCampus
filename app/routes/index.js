import express from 'express';
const router = express.Router();
import * as fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const removeExtension = (fileName) => {
  return fileName.split('.').shift()
};
const pathRouter = `${__dirname}`;
fs.readdirSync(pathRouter).filter(async (file) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ['index'].includes(fileWithOutExt);
  if(!skip){
    const {default: defaultRouter} = await import (`./${fileWithOutExt}.routes.js`);
    router.use(`/${fileWithOutExt}`, defaultRouter ) //TODO: localhost/users
    console.log("Cargar Ruta ======>", fileWithOutExt);
  };
});

export default router;