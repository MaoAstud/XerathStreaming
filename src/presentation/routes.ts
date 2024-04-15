import { Router } from "express";
import { CrudRoutes } from "../crudApi/crudRoutes";

export class AppRoutes {
    static get routes():Router{

        const router = Router();
        router.use('/api/streaming', CrudRoutes.routes)

        return router;
    }
}