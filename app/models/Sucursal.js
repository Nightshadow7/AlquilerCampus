import mongoose from "mongoose";
import {Schema} from 'mongoose';

const sucursalSchema = new mongoose.Schema(
  {
    nombre:{
      type: String,
      required: true,
      trim: true,
    },
    direccion:{
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    telefono:{
      type: Number,
      require: true,
      trim: true,
    }
  },
  {
    timestamps: true, 
    versionKey: false
  }
);

const Sucursal = mongoose.model( 'Sucursales' , sucursalSchema , 'Sucursales');

export default Sucursal;