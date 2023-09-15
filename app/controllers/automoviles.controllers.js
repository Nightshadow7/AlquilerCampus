import Automovil from "../models/Automovil.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'

export const getAutomoviles = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const [ total, automoviles ] = await Promise.all([
      Automovil.countDocuments(),
      Automovil.find()
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      automoviles
    });
  } catch (err) {
    httpError(res, err);
  };
};
export const getOneAutomovil = async (req , res= response) => {
  try {
    const { id } = req.params;
    const oneAutomovil = await Automovil.findById( id )
    res.json(oneAutomovil);
  } catch (err) {
    httpError(res, err);
  };
};
export const postAutomovil = async (req , res = response) => {
  try {
    const { ...body } = req.body;
    const data = {
      ...body
    };
    const automovil = new Automovil( data );
    await automovil.save();
    res.status(201).json(automovil);
  } catch (err) {
    httpError(res, err);
  };
};
export const deleteAutomovil = async (req, res = response) => {
  try {
    await Automovil.deleteOne({_id:req.params.id});
    res.status(204).send();
  } catch (err) {
    httpError(res, err);
  };
};
export const updateAutomovil = async (req, res = response) => {
  try {
    const { ...resto } = req.body;
    const updatedAutomovil = await Automovil.findOneAndUpdate({ _id : req.params.id } , resto , { new : true } );
    res.json({status: 'OK', automovil : updatedAutomovil});
  } catch (err) {
    httpError(res, err);
  };
};
