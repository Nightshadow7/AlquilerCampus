import mongoose from "mongoose";
import {Schema} from 'mongoose';

const registro_entregaSchema = new mongoose.Schema(
  {
    alquiler:{
      type: Schema.Types.ObjectId,
      ref: 'Alquileres',
      required: true,
      trim: true,
    },
    empleado:{
      type: Schema.Types.ObjectId,
      ref: 'Empleados',
      required: true,
      trim: true
    },
    fecha_entrega:{
      type: Date,
      require: true,
      trim: true,
    },
    combustible_entregado:{
      type: Number,
      require: true,
      trim: true,
    },
    kilometraje_entregado:{
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

const Registro_Entrega = mongoose.model( 'Registros_Entregas' , registro_entregaSchema , 'Registros_Entregas');

export default Registro_Entrega;