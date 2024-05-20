import { Router } from "express";
import { UsuarioService } from "../../services/usuario.service";
import { AuthController } from "./authController";

export class AuthRoutes{
    static get routes():Router {

        const router = Router();
        const authController = new AuthController(new UsuarioService());

        router.post('/usuario', authController.createUsuario);
        router.post('/iniciar/sesion', authController.inicioSesion);
        router.put('/usuario/:id', authController.updateUsuario);
        router.get('/usuario/:id', authController.usuarioById);

        return router;
    }
}