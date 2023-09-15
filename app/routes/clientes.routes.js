import { Router } from "express";
import * as clientesControllers from "./../controllers/clientes.controllers.js";

const router = Router();

router.get(`/`, clientesControllers.getClientes);
//2. http://localhost:8000/api/clientes/

router.get(`/:id`, clientesControllers.getOneCliente);
router.post(`/`, clientesControllers.postCliente);
router.delete(`/:id`, clientesControllers.deleteCliente);
router.patch(`/:id`, clientesControllers.updateCliente);


export default router;