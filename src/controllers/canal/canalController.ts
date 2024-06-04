import { Request, Response } from "express";

import { CanalService } from '../../services/canal.service';

export class CanalController{

    constructor(
        private canalService:CanalService
    ){}

    public createCanal = async(req:Request, res:Response) => {
        try {

            const jsonData = req.body;
            const result = await this.canalService.crearCanal(jsonData);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, canal: result.canal });

        } catch (error:any) {
            console.error('Error al crear canal:', error);
            return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        }
    };

    public updateCanal = async (req: Request, res: Response) => {
        const idCanal = parseInt(req.params.id);
        try {

            const jsonData = req.body;
            const result = await this.canalService.actualizarCanal(idCanal, jsonData);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, canal: result.canal });

        } catch (error:any) {
          console.error('Error al actualizar canal:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

    public canalById = async (req: Request, res: Response) => {
        const idCanal = parseInt(req.params.id);
        try {

            const result = await this.canalService.obtenerCanalPorId(idCanal);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, canal: result.canal });

        } catch (error:any) {
          console.error('Error al encontrar canal:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

    public buscarCanales = async (req: Request, res: Response) => {
        try {

            const result = await this.canalService.buscarCanalesPorNombre();

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, canales: result.canales });

        } catch (error:any) {
          console.error('Error al buscar canales por nombre:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };
}