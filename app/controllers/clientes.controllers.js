import Cliente from "../models/Cliente.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'

// 2. Mostrar todos los clientes registrados en la base de datos
export const getClientes = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const [ total, clientes ] = await Promise.all([
      Cliente.countDocuments(),
      Cliente.find()
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      clientes
    });
  } catch (err) {
    httpError(res, err);
  };
};
export const getOneCliente = async (req , res= response) => {
  try {
    const { id } = req.params;
    const oneCliente = await Cliente.findById( id )
    res.json(oneCliente);
  } catch (err) {
    httpError(res, err);
  };
};
export const postCliente = async (req , res = response) => {
  try {
    const { ...body } = req.body;
    const [dniDB , clientDB] = await Promise.all([
      Cliente.findOne({ DNI: body.DNI }),
      Cliente.findOne({ nombre: body.nombre}),
    ]);
    if ( dniDB ) return res.status(400).json({
      msg: `El  usuario ${clientDB.nombre} ya se encuentra registrado`
    });
    const data = {
      ...body
    };
    const cliente = new Cliente( data );
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    httpError(res, err);
  };
};
export const deleteCliente = async (req, res = response) => {
  try {
    await Cliente.deleteOne({_id:req.params.id});
    res.status(204).send();
  } catch (err) {
    httpError(res, err);
  };
};
export const updateCliente = async (req, res = response) => {
  try {
    const { ...resto } = req.body;
    const updatedCliente = await Cliente.findOneAndUpdate({ _id : req.params.id } , resto , { new : true } );
    res.json({status: 'OK', cliente : updatedCliente});
  } catch (err) {
    httpError(res, err);
  };
};
