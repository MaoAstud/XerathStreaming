import { Router } from "express";
import { CanalService } from "../../services/canal.service";
import { CanalController } from "./canalController";

export class CanalRoutes{
    static get routes():Router {

        const router = Router();
        const canalController = new CanalController(new CanalService());

        router.post('/', canalController.createCanal);
        router.put('/:id', canalController.updateCanal);
        router.get('/:id', canalController.canalById);
        router.get('/buscar/all', canalController.buscarCanales);

        return router;
    }
}