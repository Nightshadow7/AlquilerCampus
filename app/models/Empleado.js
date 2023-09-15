import mongoose from "mongoose";
import {Schema} from 'mongoose';

const empleadoSchema = new mongoose.Schema(
  {
    nombre:{
      type: String,
      required: true,
      trim: true,
    },
    apellido:{
      type: String,
      required: true,
      trim: true
    },
    DNI:{
      type: Number,
      required: true,
      trim: true,
      unique : true
    },
    direccion:{
      type: String,
      required: true,
      trim: true
    },
    telefono:{
      type: Number,
      require: true,
      trim: true,
    },
    cargo:{
      type: String,
      require: true,
      trim: true,
    }
  },
  {
    timestamps: true, 
    versionKey: false
  }
);

const Empleado = mongoose.model( 'Empleados' , empleadoSchema , 'Empleados');

export default Empleado;