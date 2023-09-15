import mongoose from "mongoose";
import {Schema} from 'mongoose';

const registro_devolucionSchema = new mongoose.Schema(
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
    fecha_devolucion:{
      type: Date,
      require: true,
      trim: true,
    },
    combustible_devuelto:{
      type: Number,
      require: true,
      trim: true,
    },
    kilometraje_devuelto:{
      type: Number,
      require: true,
      trim: true,
    },
    monto_adicional:{
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
const Registro_Devolucion = mongoose.model( 'Registros_Devoluciones' , registro_devolucionSchema , 'Registros_Devoluciones');

export default Registro_Devolucion;