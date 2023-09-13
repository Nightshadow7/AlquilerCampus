import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`***** CONEXION CORRECTA ***** Conectado a MongoDB`);
  } catch (error) {
    console.error(err);
    throw new Error(`***** ERROR DE CONEXION *****${err.message}`);
  };
};
export default conectarDB;