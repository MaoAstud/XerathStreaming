import { Request, Response } from "express";
import { prisma } from "../data";
import { Usuario } from "../interface/usuario.interface";

export class AuthController{

    constructor(){}

    public createUsuario = async(req:Request, res:Response) => {
        let usuario:Usuario = req.body;

        prisma.usuario.create({
            data: {
                nombreUsuario:usuario.nombreUsuario,
                email:usuario.email,
                contrasena: usuario.contrasena
            }
        });

        return res.status(201).json(usuario);
    }

}