import { Router } from "express";
import * as alquilerControllers from "./../controllers/alquileres.controllers.js";

const router = Router();

//4. http://localhost:8000/api/alquileres/
router.get(`/`, alquilerControllers.getAlquileres);

//6. http://localhost:8000/api/alquileres/:id
router.get(`/:id`, alquilerControllers.getOneAlquiler);
router.post(`/`, alquilerControllers.postAlquiler);
router.delete(`/:id`, alquilerControllers.deleteAlquiler);
router.patch(`/:id`, alquilerControllers.updateAlquiler);

export default router;