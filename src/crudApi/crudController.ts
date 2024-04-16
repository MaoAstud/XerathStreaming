import { Request, Response } from "express";
import { UsuarioDto } from "./dtos/usuario.dto";
import { Usuario } from "./interfaces/usuario.interface";

export class CrudController{

    constructor(){}

    public getCrud = (req:Request, res:Response) => {
    
        res.json({id:'TODO BIEN'});
    
    }

    public createUsuario = async(req:Request, res:Response) => {
        let {usuario} = req.body;
        console.log(usuario);
        let respuesta = await UsuarioDto.createUsuarioDto(usuario);

        res.json(respuesta);
    }

}