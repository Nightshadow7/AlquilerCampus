import Registro_Entrega from "../models/Registro_Entrega.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'
import { date } from "../helpers/dateValidator.js";

export const getRegistros_Entregas = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const [ total, registros_para_entregas ] = await Promise.all([
      Registro_Entrega.countDocuments(),
      Registro_Entrega.find()
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
      registros_para_entregas
    });
  } catch (err) {
    httpError(res, err);
  };
};
export const getOneRegistro_Entrega = async (req , res= response) => {
  try {
    const { id } = req.params;
    const oneRegistro_Entrega = await Registro_Entrega.findById( id )
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
    res.json(oneRegistro_Entrega);
  } catch (err) {
    httpError(res, err);
  };
};
export const postRegistro_Entrega = async (req , res = response) => {
  try {
    const { fecha_entrega , ...body } = req.body;
    const fecha = await date(fecha_entrega);
    const data = {
      fecha_entrega : fecha ,
      ...body
    };
    const registro_para_entrega = new Registro_Entrega( data );
    await registro_para_entrega.save();
    res.status(201).json(registro_para_entrega);
  } catch (err) {
    httpError(res, err);
  };
};
export const deleteRegistro_Entrega = async (req, res = response) => {
  try {
    await Registro_Entrega.deleteOne({_id:req.params.id});
    res.status(204).send();
  } catch (err) {
    httpError(res, err);
  };
};
export const updateRegistro_Entrega = async (req, res = response) => {
  try {
    const { fecha_entrega , ...resto } = req.body;
    const fecha = await date(fecha_entrega);
    const data = {
      fecha_entrega : fecha ,
      ...resto
    };
    const updatedRegistro = await Registro_Entrega.findOneAndUpdate({ _id : req.params.id } , data , { new : true } );
    res.json({status: 'OK', registro_para_entrega : updatedRegistro});
  } catch (err) {
    httpError(res, err);
  };
};
