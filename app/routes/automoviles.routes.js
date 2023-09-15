import { Router } from "express";
import * as automovilControllers from "../controllers/automoviles.controllers.js";

const router = Router();

router.get(`/`, automovilControllers.getAutomoviles);
router.get(`/:id`, automovilControllers.getOneAutomovil);
router.post(`/`, automovilControllers.postAutomovil);
router.delete(`/:id`, automovilControllers.deleteAutomovil);
router.patch(`/:id`, automovilControllers.updateAutomovil);

export default router;