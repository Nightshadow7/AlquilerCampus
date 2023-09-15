import { Router } from "express";
import * as registroDevolucionControllers from "../controllers/registro_devolucion.controllers.js";

const router = Router();

router.get(`/`, registroDevolucionControllers.getRegistros_Devoluciones);
router.get(`/:id`, registroDevolucionControllers.getOneRegistro_Devolucion);
router.post(`/`, registroDevolucionControllers.postRegistro_Devolucion);
router.delete(`/:id`, registroDevolucionControllers.deleteRegistro_Devolucion);
router.patch(`/:id`, registroDevolucionControllers.updateRegistro_Devolucion);

export default router;