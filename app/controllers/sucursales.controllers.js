import Sucursal from "../models/Sucursal.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'

export const getSucursales = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const [ total, sucursales ] = await Promise.all([
      Sucursal.countDocuments(),
      Sucursal.find()
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      sucursales
    });
  } catch (err) {
    httpError(res, err);
  };
};
export const getOneSucursal = async (req , res= response) => {
  try {
    const { id } = req.params;
    const oneSucursal = await Sucursal.findById( id )
    res.json(oneSucursal);
  } catch (err) {
    httpError(res, err);
  };
};
export const postSucursal = async (req , res = response) => {
  try {
    const { ...body } = req.body;
    const [dirDB , nameDB] = await Promise.all([
      Sucursal.findOne({ direccion: body.direccion }),
      Sucursal.findOne({ nombre: body.nombre}),
    ]);
    if ( dirDB ) return res.status(400).json({
      msg: `La Sucursal ${nameDB.nombre} ya se encuentra registrada`
    });
    const data = {
      ...body
    };
    const sucursal = new Sucursal( data );
    await sucursal.save();
    res.status(201).json(sucursal);
  } catch (err) {
    httpError(res, err);
  };
};
export const deleteSucursal = async (req, res = response) => {
  try {
    await Sucursal.deleteOne({_id:req.params.id});
    res.status(204).send();
  } catch (err) {
    httpError(res, err);
  };
};
export const updateSucursal = async (req, res = response) => {
  try {
    const { ...resto } = req.body;
    const updatedSucursal = await Sucursal.findOneAndUpdate({ _id : req.params.id } , resto , { new : true } );
    res.json({status: 'OK', Sucursal : updatedSucursal});
  } catch (err) {
    httpError(res, err);
  };
};
