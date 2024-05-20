import { IsNotEmpty, IsEmail, IsString, Length, IsOptional, IsNumber } from 'class-validator';

export class UsuarioDTO {
  @IsOptional() // El ID es opcional en algunas operaciones
  @IsNumber({ allowNaN: false, allowInfinity: false },{ message: "El id del usuario tiene que ser de tipo numerico" })
  idUsuario?: number;
  
  @IsNotEmpty({ message: "El campo nombreUsuario no puede estar vacio" })
  @IsString({ message: "El campo nombreUsuario tiene que ser de tipo string" })
  @Length(2, 50, { message: "El campo nombreUsuario debe tener entrre 2 y 50 caracteres" })
  nombreUsuario: string | undefined;

  @IsNotEmpty({ message: "El campo email no puede estar vacio" })
  @IsEmail({}, { message: "El campo email tiene que contener un email valido" })
  email: string | undefined;

  @IsNotEmpty({ message: "El campo contrasena no puede estar vacio" })
  @IsString({ message: "El campo contrasena tiene que ser de tipo string" })
  @Length(8, 20, { message: "El campo contrasena debe tener entrre 8 y 20 caracteres" })
  contrasena: string | undefined;

  constructor(nombreUsuario: string | undefined, email: string | undefined, contrasena: string | undefined) {
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.contrasena = contrasena;
  }

  static create(data: Partial<UsuarioDTO>) {
    const usuario = new UsuarioDTO(
      data.nombreUsuario,
      data.email,
      data.contrasena,
    );
    return usuario;
  }

  static update(idUsuario: number, data: Partial<UsuarioDTO>) {
    const usuario = new UsuarioDTO(
      data.nombreUsuario,
      data.email,
      data.contrasena,
    );
    usuario.idUsuario = idUsuario;
    return usuario;
  }
}
