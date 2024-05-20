import { Router } from "express";
import { AuthRoutes } from "../controllers/auth/authRoutes";
import { CanalRoutes } from "../controllers/canal/canalRoutes";
import { ImagesRoutes } from "../controllers/images/imagesRouter";
import { NotificacionRouter } from "../controllers/notificacion/notificacionRouter";
import { SeguidorRouter } from "../controllers/seguidor/seguidorRoutes";

export class AppRoutes {
    static url:string = "/api/streaming";
    static get routes():Router{

        const router = Router();
        
        router.use(`${this.url}/auth`, AuthRoutes.routes)
        router.use(`${this.url}/canal`, CanalRoutes.routes)
        router.use(`${this.url}/seguidor`, SeguidorRouter.routes)
        router.use(`${this.url}/img`, ImagesRoutes.routes)
        router.use(`${this.url}/noti`, NotificacionRouter.routes)

        return router;
    }
}