import { Router } from "express";
import * as sucursalControllers from "../controllers/sucursales.controllers.js";

const router = Router();

router.get(`/`, sucursalControllers.getSucursales);
router.get(`/:id`, sucursalControllers.getOneSucursal);
router.post(`/`, sucursalControllers.postSucursal);
router.delete(`/:id`, sucursalControllers.deleteSucursal);
router.patch(`/:id`, sucursalControllers.updateSucursal);

export default router;