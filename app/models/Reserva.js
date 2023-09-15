import mongoose from "mongoose";
import {Schema} from 'mongoose';

const reservaSchema = new mongoose.Schema(
  {
    cliente:{
      type: Schema.Types.ObjectId,
      ref: 'Clientes',
      required: true,
      trim: true,
    },
    automovil:{
      type: Schema.Types.ObjectId,
      ref: 'Sucursales_de_automoviles',
      required: true,
      trim: true
    },
    fecha_reserva:{
      type: Date,
      require: true,
      trim: true,
    },
    fecha_inicio:{
      type: Date,
      require: true,
      trim: true,
    },
    fecha_fin:{
      type: Date,
      require: true,
      trim: true,
    },
    estado:{
      type: Boolean,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
    versionKey: false
  }
);

const Reserva = mongoose.model( 'Reservas' , reservaSchema , 'Reservas');

export default Reserva;