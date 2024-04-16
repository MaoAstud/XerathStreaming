import { prisma } from "../../data"
import { Usuario } from "../interfaces/usuario.interface";

export class UsuarioDto{

    constructor(){}

    public static createUsuarioDto = async(usuario:any) => {
        console.log(usuario);
        return await prisma.usuario.create({
            data: usuario
        });
    } 

}