import Registro_Devolucion from "../models/Registro_Devolucion.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'
import { date } from "../helpers/dateValidator.js";

export const getRegistros_Devoluciones = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const [ total, registros_para_devoluciones ] = await Promise.all([
      Registro_Devolucion.countDocuments(),
      Registro_Devolucion.find()
        .populate({
          path: 'alquiler',
          select: '-estado',
          populate:[
            {
              path: 'cliente',
              select: ['-DNI'  , '-direccion'],
            },
            {
              path: 'automovil',
            }
          ]
        })
        .populate('empleado' , ['-DNI'  , '-direccion'])
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      registros_para_devoluciones
    });
  } catch (err) {
    httpError(res, err);
  };
};
export const getOneRegistro_Devolucion = async (req , res= response) => {
  try {
    const { id } = req.params;
    const oneRegistro_Devolucion = await Registro_Devolucion.findById( id )
      .populate({
        path: 'alquiler',
        select: '-estado',
        populate:[
          {
            path: 'cliente',
            select: ['-DNI'  , '-direccion'],
          },
          {
            path: 'automovil',
          }
        ]
      })
      .populate('empleado' , ['-DNI'  , '-direccion'])
    res.json(oneRegistro_Devolucion);
  } catch (err) {
    httpError(res, err);
  };
};
export const postRegistro_Devolucion = async (req , res = response) => {
  try {
    const { fecha_devolucion , ...body } = req.body;
    const fecha = await date(fecha_devolucion);
    const data = {
      fecha_devolucion : fecha ,
      ...body
    };
    const registro_para_devolucion = new Registro_Devolucion( data );
    await registro_para_devolucion.save();
    res.status(201).json(registro_para_devolucion);
  } catch (err) {
    httpError(res, err);
  };
};
export const deleteRegistro_Devolucion = async (req, res = response) => {
  try {
    await Registro_Devolucion.deleteOne({_id:req.params.id});
    res.status(204).send();
  } catch (err) {
    httpError(res, err);
  };
};
export const updateRegistro_Devolucion = async (req, res = response) => {
  try {
    const { fecha_devolucion , ...resto } = req.body;
    const fecha = await date(fecha_devolucion);
    const data = {
      fecha_devolucion : fecha ,
      ...resto
    };
    const updatedRegistro = await Registro_Devolucion.findOneAndUpdate({ _id : req.params.id } , data , { new : true } );
    res.json({status: 'OK', registro_para_devolucion : updatedRegistro});
  } catch (err) {
    httpError(res, err);
  };
};
