import Reserva from "../models/Reserva.js";
import Cliente from "../models/Cliente.js";
import Sucursal_Automovil from "../models/Sucursal_Automovil.js";
import Automovil from "../models/Automovil.js";
import { response } from 'express';
import { httpError} from './../helpers/handleError.js'
import { date } from "../helpers/dateValidator.js";

//4. Listar todos los alquileres activos junto con los datos de los clientes relacionados.
export const getReservasActivas = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const query = { 
      estado: true 
    };
    const [ total, reservas ] = await Promise.all([
      Reserva.countDocuments(query),
      Reserva.find(query)
        .populate('cliente' , ['-DNI'  , '-direccion'])
        .populate({
          path: 'automovil',
          populate:[
            {
              path: 'sucursal',
            },
            {
              path: 'automovil',
            }
          ]
        })
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      reservas
    });
  } catch (err) {
    httpError(res, err);
  };
};
//5. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
export const getReservasPendientes = async (req, res = response) => {
  try {
    const { hasta = 10, desde = 0} = req.query;
    const query = { 
      estado: false 
    };
    const [ total, reservas ] = await Promise.all([
      Reserva.countDocuments(query),
      Reserva.find(query)
        .populate('cliente' , ['-DNI'  , '-direccion'])
        .populate({
          path: 'automovil',
          populate:[
            {
              path: 'sucursal',
            },
            {
              path: 'automovil',
            }
          ]
        })
        .skip( Number( desde ) )
        .limit( Number( hasta ) )
    ]);
    res.json({
      total,
      reservas
    });
  } catch (err) {
    httpError(res, err);
  };
};
export const getOneReserva = async (req , res= response) => {
  try {
    const { id } = req.params;
    const oneReserva = await Reserva.findById( id )
      .populate('cliente' , ['-DNI'  , '-direccion'])
      .populate({
        path: 'automovil',
        populate:[
          {
            path: 'sucursal',
          },
          {
            path: 'automovil',
          }
        ]
      })
    res.json(oneReserva);
  } catch (err) {
    httpError(res, err);
  };
};
export const postReserva = async (req , res = response) => {
  try {
    const { fecha_reserva , fecha_inicio , fecha_fin , automovil , ...body } = req.body;
    const [reservacion , inicio , fin , disponibilidad] = await Promise.all([
      date(fecha_reserva),
      date(fecha_inicio),
      date(fecha_fin),
      Sucursal_Automovil.findOne({ _id: automovil}),
    ]);
    const auto = await Automovil.findOne({ _id: disponibilidad.automovil});
    if (disponibilidad.cantidad_disponible < 1) {
      return res.status(400).json({
      msg: `La Automovil ${auto.modelo} ${auto.marca} no posee exitencias para reservar`
      });
    } else {
      await Sucursal_Automovil.findByIdAndUpdate({ _id: disponibilidad._id} , { cantidad_disponible : disponibilidad.cantidad_disponible-1 }, { new : true});
    }
    const data = {
      fecha_reserva: reservacion,
      fecha_inicio: inicio,
      fecha_fin: fin ,
      automovil,
      ...body
    };
    const reserva = new Reserva( data );
    await reserva.save();
    res.status(201).json(reserva);
  } catch (err) {
    httpError(res, err);
  };
};
export const deleteReserva = async (req, res = response) => {
  try {
    const { id } = req.params
    const [reservaEliminada , cliente] = await Promise.all([
      Reserva.findByIdAndUpdate( id, { estado: false } , { new : true } ),
      Cliente.findOne({ _id: reservaEliminada})
    ]);
    res.status(200).json({
      msg: `Se elimino la reserva de ${ cliente.nombre }, satisfactoriamente`
    })
  } catch (err) {
    httpError(res, err);
  };
};
export const updateReserva = async (req, res = response) => {
  try {
    const { fecha_reserva , fecha_inicio , fecha_fin , automovil , estado , ...resto } = req.body;
    const [reservacion , inicio , fin, disponibilidad] = await Promise.all([
      date(fecha_reserva),
      date(fecha_inicio),
      date(fecha_fin),
      Sucursal_Automovil.findOne({ _id: automovil}),
    ]);
    const [auto , reservaActual] = await Promise.all([
      Automovil.findOne({ _id: disponibilidad.automovil}),
      Reserva.findOne({ _id: req.params.id })
    ]);
    const actualizar =  async (nuevaCantidad) => {
      await Sucursal_Automovil.findByIdAndUpdate({ _id: disponibilidad._id} , { cantidad_disponible : nuevaCantidad }, { new : true});
    };
    if( estado !== reservaActual.estado){
      if (estado === false) {
        await actualizar(disponibilidad.cantidad_disponible +1);
      }else{
        if (disponibilidad.cantidad_disponible < 1) {
          return res.status(400).json({
          msg: `La Automovil ${auto.modelo} ${auto.marca} no posee existencias para reservar`
          });
        } else {
          await actualizar(disponibilidad.cantidad_disponible -1);
        }
      }
      const data = {
        fecha_reserva: reservacion,
        fecha_inicio: inicio,
        fecha_fin: fin ,
        automovil,
        estado,
        ...resto
      };
    };
    const updatedRegistro = await Reserva.findOneAndUpdate({ _id : req.params.id } , data , { new : true } );
    res.json({status: 'OK', registro_para_entrega : updatedRegistro});
  } catch (err) {
    httpError(res, err);
  };
};

