import Alquiler from './../models/Alquiler.js';
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'
import { date } from './../helpers/dateValidator.js' 

//4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
export const getAlquileres = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const query = { 
      estado: true 
    };
    const [ total, alquileres ] = await Promise.all([
      Alquiler.countDocuments(query),
      Alquiler.find(query)
        .populate('cliente', ['nombre', 'apellido', 'DNI'])
        .populate('automovil','-precio_diario')
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      alquileres
    });
  } catch (err) {
    httpError(res, err);
  };
};
//6. Obtener los detalles del alquiler con el ID_Alquiler específico.
export const getOneAlquiler = async (req, res = response) => {
  try {
    const { id } = req.params;
    const oneAlquiler = await Alquiler.findById( id )
      .populate('cliente', ['nombre', 'apellido', 'DNI'])
      .populate('automovil','-precio_diario')
    res.json(oneAlquiler);
  } catch (err) {
    httpError(res, err);
  };
};

export const postAlquiler = async(req, res = response ) => {
  try {
    //Año-Mes-dia ejemplo: 2023-01-11
    const { fecha_fin, fecha_inicio , ...body } = req.body;
    const [fin , inicio] = await Promise.all([
      date(fecha_fin),
      date(fecha_inicio)
    ]);
    const data = {
      fecha_fin : fin,
      fecha_inicio : inicio,
      ...body
    };
    const alquiler = new Alquiler( data );
    await alquiler.save();
    res.status(201).json(alquiler);
  } catch (err) {
    httpError(res, err);
  };
};
export const deleteAlquiler = async (req, res = response) => {
  try {
    const { id } = req.params
    const alquilerEliminado = await Alquiler.findByIdAndUpdate( id, { estado: false } , { new : true } );
    res.status(200).json({
      msg: `Se elmino el alquiler de ${ alquilerEliminado.cliente }, satisfactoriamente`
    })
  } catch (err) {
    httpError(res, err);
  };
};
export const updateAlquiler = async (req, res = response) => {
  try {
    const { fecha_fin , fecha_inicio , ...resto } = req.body;
    const [fin , inicio] = await Promise.all([
      date(fecha_fin),
      date(fecha_inicio)
    ]);
    const data = {
      fecha_fin : fin,
      fecha_inicio : inicio,
      ...resto
    };
    const updatedAlquiler = await Alquiler.findOneAndUpdate({ _id : req.params.id } , data , { new : true } );
    res.json({status: 'OK', alquiler : updatedAlquiler});
  } catch (err) {
    httpError(res, err);
  };
};