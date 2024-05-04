import { Router } from "express";
import { CrudRoutes } from "../crudApi/crudRoutes";
import { AuthRoutes } from "../auth/authRoutes";

export class AppRoutes {
    static get routes():Router{

        const router = Router();
        
        router.use('/api/streaming/auth', AuthRoutes.routes)

        return router;
    }
}