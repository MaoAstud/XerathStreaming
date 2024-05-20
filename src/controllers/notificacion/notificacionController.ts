import { Request, Response } from "express";

import { NotificacionService } from '../../services/notificacion.service';

export class NotificacionController{

    constructor(
        private notificacionService:NotificacionService
    ){}

    public createCanal = async(req:Request, res:Response) => {
        try {

            const jsonData = req.body;
            const result = await this.notificacionService.crearNotificacion(jsonData);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, notificacion: result.notificacion });

        } catch (error:any) {
            console.error('Error al crear notificación:', error);
            return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        }
    };

    public clickNotificacion = async (req: Request, res: Response) => {
        const idNotificacion = parseInt(req.params.id);
        try {

            const result = await this.notificacionService.actualizarNotificacion(idNotificacion);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, notificacion: result.notificacion });

        } catch (error:any) {
          console.error('Error al actualizar notificación:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

    public notificacionById = async (req: Request, res: Response) => {
        const idUsuario = parseInt(req.params.id);
        try {

            const result = await this.notificacionService.obtenerNotificacionPorId(idUsuario);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, notificaciones: result.notificaciones });

        } catch (error:any) {
          console.error('Error al encontrar notificaciones:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };
}