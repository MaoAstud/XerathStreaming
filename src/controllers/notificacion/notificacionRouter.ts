import { Router } from "express";
import { NotificacionService } from "../../services/notificacion.service";
import { NotificacionController } from "./notificacionController";

export class NotificacionRouter{
    static get routes():Router {

        const router = Router();
        const notificacionController = new NotificacionController(new NotificacionService());

        router.post('/', notificacionController.createCanal);
        router.put('/:id', notificacionController.clickNotificacion);
        router.get('/:id', notificacionController.notificacionById);

        return router;
    }
}