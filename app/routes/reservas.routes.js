import { Router } from "express";
import * as reservasControllers from "../controllers/reservas.controllers.js";

const router = Router();

//4. http://localhost:8000/api/reservas/
router.get(`/`, reservasControllers.getReservasActivas);

//5. http://localhost:8000/api/reservas/pendientes
router.get(`/pendientes`, reservasControllers.getReservasPendientes);

//6. http://localhost:8000/api/reservas/:id
router.get(`/:id`, reservasControllers.getOneReserva);

router.post(`/`, reservasControllers.postReserva);
router.delete(`/:id`, reservasControllers.deleteReserva);
router.patch(`/:id`, reservasControllers.updateReserva);

export default router;