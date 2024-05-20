import { Request, Response } from "express";

import { SeguidorService } from '../../services/seguidor.service';

export class SeguidorController{

    constructor(
        private seguidorService:SeguidorService
    ){}

    public createSeguidor = async(req:Request, res:Response) => {
        try {

            const jsonData = req.body;
            const result = await this.seguidorService.crearSeguidor(jsonData);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, seguidor: result.seguidor });

        } catch (error:any) {
            console.error('Error al crear usuario:', error);
            return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        }
    };

    public unfollow = async (req: Request, res: Response) => {
        try {

            const idSeguidor = parseInt(req.params.idSeguidor);
            const result = await this.seguidorService.desactivarSeguidor(idSeguidor, false);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, seguidor: result.seguidor });

        } catch (error:any) {
          console.error('Error al actualizar seguidor:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

    public seguidorById = async (req: Request, res: Response) => {
        const idSeguidor = parseInt(req.params.id);
        try {

            const result = await this.seguidorService.obtenerSeguidorPorId(idSeguidor);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, seguidor: result.seguidor });

        } catch (error:any) {
          console.error('Error al encontrar seguidor:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

    public seguidoresByUsuario = async (req: Request, res: Response) => {
        const idUsuario = parseInt(req.params.id);
        try {

            const result = await this.seguidorService.listarSeguidoresUsuario(idUsuario);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, seguidos: result.seguidores });

        } catch (error:any) {
          console.error('Error al encontrar seguidos:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

    public seguidoresByCanal = async (req: Request, res: Response) => {
        const idCanal = parseInt(req.params.id);
        try {

            const result = await this.seguidorService.listarSeguidoresCanal(idCanal);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, seguidores: result.seguidores });

        } catch (error:any) {
          console.error('Error al encontrar seguidor:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };
}