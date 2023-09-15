import { Router } from "express";
import * as sucursalAutomovilControllers from "../controllers/sucursales_automoviles.controllers.js";

const router = Router();

//3. http://localhost:8000/api/sucursalesAutomoviles/
router.get(`/`, sucursalAutomovilControllers.getSucursales_Automoviles);

router.get(`/:id`, sucursalAutomovilControllers.getOneSucursal_Automovil);
router.post(`/`, sucursalAutomovilControllers.postSucursal_Automovil);
router.delete(`/:id`, sucursalAutomovilControllers.deleteSucursal_Automovil);
router.patch(`/:id`, sucursalAutomovilControllers.updateSucursal_Automovil);

export default router;