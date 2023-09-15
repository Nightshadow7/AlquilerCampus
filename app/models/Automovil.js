import mongoose from "mongoose";
import {Schema} from 'mongoose';

const automovilSchema = new mongoose.Schema(
  {
    marca:{
      type: String,
      required: true,
      trim: true,
    },
    modelo:{
      type: String,
      required: true,
      trim: true
    },
    año:{
      type: Number,
      require: true,
      trim: true,
    },
    tipo:{
      type: String,
      require: true,
      trim: true,
    },
    capacidad:{
      type: Number,
      require: true,
      trim: true,
    },
    precio_diario:{
      type: Number,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
    versionKey: false
  }
);
const Automovil = mongoose.model( 'Automoviles' , automovilSchema , 'Automoviles');

export default Automovil;