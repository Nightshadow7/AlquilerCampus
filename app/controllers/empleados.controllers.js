import Empleado from "../models/Empleado.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'

export const getEmpleados = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const [ total, empleados ] = await Promise.all([
      Empleado.countDocuments(),
      Empleado.find()
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      empleados
    });
  } catch (err) {
    httpError(res, err);
  };
};
//7. Listar los empleados con el cargo de "Vendedor".
export const getEmpleadosCargo = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0 } = req.query;
    const {cargo} = req.params; 
    const regex =  new RegExp( cargo , 'i');
    const query = { 
      "cargo" : regex,
    };
    const [ total, empleados ] = await Promise.all([
      Empleado.countDocuments(query),
      Empleado.find(query)
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      empleados
    });
  } catch (err) {
    httpError(res, err);
  };
};
export const getOneEmpleado = async (req , res= response) => {
  try {
    const { id } = req.params;
    const oneEmpleado = await Empleado.findById( id )
    res.json(oneEmpleado);
  } catch (err) {
    httpError(res, err);
  };
};
export const postEmpleado = async (req , res = response) => {
  try {
    const { ...body } = req.body;
    const [dniDB , clientDB] = await Promise.all([
      Empleado.findOne({ DNI: body.DNI }),
      Empleado.findOne({ nombre: body.nombre}),
    ]);
    if ( dniDB ) return res.status(400).json({
      msg: `El  usuario ${clientDB.nombre} ya se encuentra registrado`
    });
    const data = {
      ...body
    };
    const empleado = new Empleado( data );
    await empleado.save();
    res.status(201).json(empleado);
  } catch (err) {
    httpError(res, err);
  };
};
export const deleteEmpleado = async (req, res = response) => {
  try {
    await Empleado.deleteOne({_id:req.params.id});
    res.status(204).send();
  } catch (err) {
    httpError(res, err);
  };
};
export const updateEmpleado = async (req, res = response) => {
  try {
    const { ...resto } = req.body;
    const updatedEmpleado = await Empleado.findOneAndUpdate({ _id : req.params.id } , resto , { new : true } );
    res.json({status: 'OK', empleado : updatedEmpleado});
  } catch (err) {
    httpError(res, err);
  };
};
