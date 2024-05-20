import { Router } from "express";
import { SeguidorService } from "../../services/seguidor.service";
import { SeguidorController } from "./seguidorController";

export class SeguidorRouter{
    static get routes():Router {

        const router = Router();
        const seguidorController = new SeguidorController(new SeguidorService());

        router.post('/', seguidorController.createSeguidor);
        router.put('/unfollow/:idSeguidor', seguidorController.unfollow);
        router.get('/:id', seguidorController.seguidorById);
        router.get('/usuario/:id', seguidorController.seguidoresByUsuario);
        router.get('/canal/:id', seguidorController.seguidoresByCanal);

        return router;
    }
}