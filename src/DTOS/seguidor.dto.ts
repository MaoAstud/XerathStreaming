import { IsNotEmpty, IsBoolean, IsNumber, IsInt, IsOptional } from 'class-validator';

export class SeguidorDTO {
  @IsOptional() // El ID es opcional en algunas operaciones
  @IsNumber({ allowNaN: false, allowInfinity: false },{ message: "El id del seguidor tiene que ser de tipo numerico" })
  idSeguidor?: number;

  @IsNotEmpty({ message: 'El ID de usuario no puede estar vacío' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'El ID de usuario debe ser un número' })
  @IsInt({ message: 'El ID de usuario debe ser un número entero' })
  idUsuario: number | undefined;

  @IsNotEmpty({ message: 'El ID de canal no puede estar vacío' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'El ID de canal debe ser un número' })
  @IsInt({ message: 'El ID de canal debe ser un número entero' })
  idCanal: number | undefined;

  @IsOptional()
  @IsNotEmpty({ message: 'El campo activo no puede estar vacío' })
  @IsBoolean({ message: 'El campo activo debe ser un valor booleano' })
  activo: boolean | undefined  = true;

  constructor(idUsuario: number | undefined, idCanal: number | undefined) {
    this.idUsuario = idUsuario;
    this.idCanal = idCanal;
  }

  static create(data: Partial<SeguidorDTO>) {
    const seguidor = new SeguidorDTO(
      data.idUsuario,
      data.idCanal
    );
    return seguidor;
  }

}
