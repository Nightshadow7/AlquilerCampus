import { Router } from "express";
import * as empleadoControllers from "../controllers/empleados.controllers.js";

const router = Router();

router.get(`/`, empleadoControllers.getEmpleados);
router.get(`/:id`, empleadoControllers.getOneEmpleado);
router.post(`/`, empleadoControllers.postEmpleado);
router.delete(`/:id`, empleadoControllers.deleteEmpleado);
router.patch(`/:id`, empleadoControllers.updateEmpleado);

//7. http://localhost:8000/api/empleados/ocupacion/vendedor
router.get(`/ocupacion/:cargo`, empleadoControllers.getEmpleadosCargo);



export default router;