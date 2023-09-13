import mongoose from "mongoose";
import {Schema} from 'mongoose';

const sucursal_automovilSchema = new mongoose.Schema(
  {
    sucursal:{
      type: Schema.Types.ObjectId,
      ref: 'Sucursales',
      required: true,
      trim: true,
    },
    automovil:{
      type: Schema.Types.ObjectId,
      ref: 'Automoviles',
      required: true,
      trim: true
    },
    cantidad_disponible:{
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

const Sucursal_Automovil = mongoose.model( 'Sucursales_de_automoviles' , sucursal_automovilSchema , 'Sucursales_de_automoviles');

export default Sucursal_Automovil;