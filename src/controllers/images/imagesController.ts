import { Request, Response } from "express";

import { ImageService } from '../../services/image.service';

export class ImagesController{

    constructor(
        private imageService:ImageService
    ){}

    public postBanner = async(req:any, res:any) => {
        try {

            const idCanal = parseInt(req.params.id, 10);
            const banner = req.file.buffer;
            const result = await this.imageService.postBanner(idCanal,banner);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, canal: result.canal });

        } catch (error:any) {
            console.error('Error al crear canal:', error);
            return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        }
    };

    public postPerfil = async (req: any, res: any) => {
        try {

            const idUsuario = parseInt(req.params.id, 10);
            const fotoPerfil = req.file.buffer;
            const result = await this.imageService.postImagenUsuario(idUsuario, fotoPerfil);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, usuario: result.usuario });

        } catch (error:any) {
          console.error('Error al actualizar canal:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

    public getBanner = async (req: Request, res: Response) => {
        const idCanal = parseInt(req.params.id);
        try {

            const result = await this.imageService.getBanner(idCanal);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            res.set('Content-Type', 'image/jpeg'); // Adjust the content type if necessary
            return res.send(result.canal.bannerCanal);

        } catch (error:any) {
          console.error('Error al encontrar canal:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

    public getPerfil = async (req: Request, res: Response) => {
        const idUsuario = parseInt(req.params.id);
        try {

            const result = await this.imageService.getImagenUsuario(idUsuario);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            res.set('Content-Type', 'image/jpeg'); // Adjust the content type if necessary
            return res.send(result.usuario.bannerCanal);

        } catch (error:any) {
          console.error('Error al encontrar canal:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };
}