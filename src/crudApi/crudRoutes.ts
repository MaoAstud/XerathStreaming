import { Router } from "express";
import { CrudController } from "./controller";

export class CrudRoutes{
    static get routes():Router {
        
        const router = Router();
        const crudController = new CrudController();

        router.get('/', crudController.getCrud);

        return router;
    }
}