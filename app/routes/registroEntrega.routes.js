import { Router } from "express";
import * as registroEntregaControllers from "../controllers/registro_entrega.controllers.js";

const router = Router();

router.get(`/`, registroEntregaControllers.getRegistros_Entregas);
router.get(`/:id`, registroEntregaControllers.getOneRegistro_Entrega);
router.post(`/`, registroEntregaControllers.postRegistro_Entrega);
router.delete(`/:id`, registroEntregaControllers.deleteRegistro_Entrega);
router.patch(`/:id`, registroEntregaControllers.updateRegistro_Entrega);

export default router;