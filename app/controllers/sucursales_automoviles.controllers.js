import Sucursal_Automovil from '../models/Sucursal_Automovil.js';
import Automovil from '../models/Automovil.js';
import { response } from 'express';
import { httpError} from './../helpers/handleError.js';

//3. Obtener todos los automóviles disponibles para alquiler.
export const getSucursales_Automoviles = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const query = { 
      cantidad_disponible: {$gt : 0}
    };
    const [ total, sucursales_para_automoviles_disponibles ] = await Promise.all([
      Sucursal_Automovil.countDocuments(query),
      Sucursal_Automovil.find(query)
        .populate('sucursal')
        .populate('automovil')
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      sucursales_para_automoviles_disponibles,
    });
  } catch (err) {
    httpError(res, err);
  };
};
export const getOneSucursal_Automovil = async (req , res= response) => {
  try {
    const { id } = req.params;
    const oneSucursal_Automovil = await Sucursal_Automovil.findById( id )
      .populate('sucursal')
      .populate('automovil')
    res.json(oneSucursal_Automovil);
  } catch (err) {
    httpError(res, err);
  };
};
export const postSucursal_Automovil = async (req , res = response) => {
  try {
    const { cantidad_disponible, ...body } = req.body;
    const automovil = await Automovil.findOne({ _id: body.automovil});
    if (!automovil) return res.status(400).json({
      msg: `El automóvil con ID ${body.automovil} no se encontró en la base de datos.`,
    });
    if(cantidad_disponible < 1 ) return res.status(400).json({
      msg: `El Vehiculo ${automovil.modelo} ${automovil.marca} no se puede guardar con valores de existencias negativas`
    });
    const data = {
      cantidad_disponible,
      ...body
    };
    const sucursal_para_automoviles = new Sucursal_Automovil( data );
    await sucursal_para_automoviles.save();
    res.status(201).json(sucursal_para_automoviles);
  } catch (err) {
    httpError(res, err);
  };
};
export const deleteSucursal_Automovil = async (req, res = response) => {
  try {
    await Sucursal_Automovil.deleteOne({_id:req.params.id});
    res.status(204).send();
  } catch (err) {
    httpError(res, err);
  };
};
export const updateSucursal_Automovil = async (req, res = response) => {
  try {
    const { cantidad_disponible , ...resto } = req.body;
    const automovil = await Automovil.findOne({ _id: req.body.automovil});
    if (!automovil) return res.status(400).json({
      msg: `El automóvil con ID ${body.automovil} no se encontró en la base de datos.`,
    });
    if(cantidad_disponible < 1 ) return res.status(400).json({
      msg: `El Vehiculo ${automovil.modelo} ${automovil.marca} no se puede guardar con valores de existencias negativas`
    });
    const data = {
      cantidad_disponible,
      ...resto
    };
    const updatedSucursal_Automovil = await Sucursal_Automovil.findOneAndUpdate({ _id : req.params.id } , data , { new : true } );
    res.json({status: 'OK', sucursal_de_automovil : updatedSucursal_Automovil});
  } catch (err) {
    httpError(res, err);
  };
};
export const getDisponible = async ( req , res = response ) => {
};
//8. Mostrar la cantidad total de automóviles disponibles en cada sucursal.
export const getAutos_Por_Sucursal = async (req, res = response) => {
  try {
    const sucursales = await Sucursal_Automovil.find().distinct("sucursal"); // Obtiene todas las IDs de sucursal únicas
    const resultados = await Promise.all(sucursales.map(async (sucursalId) => {
      const cantidadDisponible = await Sucursal_Automovil.aggregate([
        {
          $match: { sucursal: sucursalId },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$cantidad_disponible" },
          },
        },
      ]);

      const sucursalInfo = await Sucursal.findById(sucursalId); // Reemplaza "Sucursal" con el nombre de tu modelo de sucursal

      return {
        sucursal: sucursalInfo,
        totalAutomoviles: cantidadDisponible.length > 0 ? cantidadDisponible[0].total : 0,
      };
    }));

    res.json({
      resultado: resultados,
    });
  } catch (err) {
    httpError(res, err);
  }
};
