import mongoose from "mongoose";
import {Schema} from 'mongoose';

const clienteSchema = new mongoose.Schema(
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
      unique: true
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
    email:{
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true, 
    versionKey: false
  }
);

const Cliente = mongoose.model( 'Clientes' , clienteSchema , 'Clientes');

export default Cliente;