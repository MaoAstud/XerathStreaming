import { Router } from "express";
import { AuthController } from "./authController";

export class AuthRoutes{
    static get routes():Router {

        const router = Router();
        const authController = new AuthController();

        router.post('/crear/usuario', authController.createUsuario);
        router.post('/iniciar/sesion', authController.createUsuario);

        return router;
    }
}