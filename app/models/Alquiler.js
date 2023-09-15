import mongoose from "mongoose";
import {Schema} from 'mongoose';

const alquilerSchema = new mongoose.Schema(
  {
    cliente:{
      type: Schema.Types.ObjectId,
      ref: 'Clientes',
      required: true,
      trim: true,
    },
    automovil:{
      type: Schema.Types.ObjectId,
      ref: 'Automoviles',
      required: true,
      trim: true
    },
    fecha_inicio:{
      type: Date,
      require: false,
      trim: true,
    },
    fecha_fin:{
      type: Date,
      require: true,
      trim: true,
    },
    costo_total:{
      type: Number,
      require: true,
      trim: true,
    },
    estado:{
      type: Boolean,
      default: true,
      require: true,
      trim: true,
    }
  },
  {
    timestamps: true, 
    versionKey: false
  }
);

const Alquiler = mongoose.model( 'Alquileres' , alquilerSchema , 'Alquileres');

export default Alquiler;