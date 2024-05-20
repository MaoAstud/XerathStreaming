import { Request, Response } from "express";

import { UsuarioService } from "../../services/usuario.service";

export class AuthController{

    constructor(
        private usuarioService:UsuarioService
    ){}

    public createUsuario = async(req:Request, res:Response) => {
        try {

            const jsonData = req.body;
            const result = await this.usuarioService.crearUsuario(jsonData);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, usuario: result.usuario });

        } catch (error:any) {
            console.error('Error al crear usuario:', error);
            return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        }
    };

    public updateUsuario = async (req: Request, res: Response) => {
        const idUsuario = parseInt(req.params.id);
        try {

            const jsonData = req.body;
            const result = await this.usuarioService.actualizarUsuario(idUsuario, jsonData);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, usuario: result.usuario });

        } catch (error:any) {
          console.error('Error al actualizar usuario:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

      public usuarioById = async (req: Request, res: Response) => {
        const idUsuario = parseInt(req.params.id);
        try {

            const result = await this.usuarioService.UsuarioPorId(idUsuario);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, usuario: result.usuario });

        } catch (error:any) {
          console.error('Error al encontrar usuario:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };

    public inicioSesion = async (req: Request, res: Response) => {
        const { email, contrasena } = req.body;
        try {

            const result = await this.usuarioService.inicioSesion(email,contrasena);

            if (!result.success) {
                return res.status(result.status).json({ message: result.message, errors: result.errors });
            }
            return res.status(result.status).json({ message: result.message, usuario: result.usuario });

        } catch (error:any) {
          console.error('Error al iniciar Sesión:', error);
          return res.status(500).json({ message: `Error interno del servidor: ${error.message}` });
        } 
    };
}