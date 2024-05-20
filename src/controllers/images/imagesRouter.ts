import { Router } from "express";
import { ImageService } from "../../services/image.service";
import { ImagesController } from "./imagesController";
const multer  = require('multer')

export class ImagesRoutes{
    static get routes():Router {
        const upload = multer({ storage: multer.memoryStorage() });
        
        const router = Router();
        const imgController = new ImagesController(new ImageService());

        router.post('/:id/banner', upload.single('banner'), imgController.postBanner);
        router.post('/:id/foto-perfil', upload.single('foto-perfil'), imgController.postPerfil);
        router.get('/:id/banner', imgController.getBanner);
        router.get('/:id/foto-perfil', imgController.getPerfil);

        return router;
    }
}