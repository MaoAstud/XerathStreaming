import { Usuario } from "../interface/usuario.interface";

export class CreateUsuarioDto{

    constructor(
        public idUsuario: number,
        public nombreUsuario: string,
        public email: string,
        public contrasena: string){}

    public static create(){

    }

}