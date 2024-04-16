import { Router } from "express";
import { CrudController } from "./crudController";

export class CrudRoutes{
    static get routes():Router {

        const router = Router();
        const crudController = new CrudController();

        router.get('/', crudController.getCrud);
        router.post('/crear/usuario', crudController.createUsuario);

        return router;
    }
}