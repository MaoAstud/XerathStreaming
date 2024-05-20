import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CanalDTO {
  @IsOptional() // El ID es opcional en algunas operaciones
  @IsNumber({ allowNaN: false, allowInfinity: false },{ message: "El id del canal tiene que ser de tipo numerico" })
  idCanal?: number;

  @IsNotEmpty({ message: 'El campo nombreCanal no puede estar vacío' })
  @IsString({ message: 'El campo nombreCanal debe ser una cadena de texto' })
  @Length(2, 50, { message: "El campo nombreUsuario debe tener entrre 2 y 50 caracteres" })
  nombreCanal: string | undefined;

  @IsString({ message: 'El campo descripcionCanal debe ser una cadena de texto' })
  @IsOptional()
  descripcionCanal?: string = 'Agregue la descripción del canal';

  @IsNotEmpty({ message: 'El campo billeteraCanal no puede estar vacío' })
  @IsString({ message: 'El campo billeteraCanal debe ser una cadena de texto' })
  @Length(40, 50, { message: 'El campo billeteraCanal debe tener entre 40 y 50 caracteres' })
  billeteraCanal: string | undefined;

  @IsNumber({ allowNaN: false, allowInfinity: false },{ message: "El id del usuario tiene que ser de tipo numerico" })
  idUsuario: number | undefined;

  constructor(nombreCanal: string | undefined, descripcionCanal: string | undefined, billeteraCanal: string | undefined, idUsuario: number | undefined) {
    this.nombreCanal = nombreCanal;
    this.descripcionCanal = descripcionCanal;
    this.billeteraCanal = billeteraCanal;
    this.idUsuario = idUsuario;
  }

  static create(data: Partial<CanalDTO>) {
    const canal = new CanalDTO(
      data.nombreCanal,
      data.descripcionCanal,
      data.billeteraCanal,
      data.idUsuario
    );
    return canal;
  }

  static update(idCanal: number, data: Partial<CanalDTO>) {
    const canal = new CanalDTO(
      data.nombreCanal,
      data.descripcionCanal,
      data.billeteraCanal,
      data.idUsuario
    );
    canal.idCanal = idCanal;
    return canal;
  }
}
