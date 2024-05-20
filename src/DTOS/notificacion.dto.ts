import { IsNotEmpty, IsBoolean, IsNumber, IsInt, IsOptional, IsDate } from 'class-validator';

export class NotificacionDTO {
  @IsOptional() // El ID es opcional en algunas operaciones
  @IsNumber({ allowNaN: false, allowInfinity: false },{ message: "El id de la notificación tiene que ser de tipo numerico" })
  @IsInt({ message: 'El ID de la notificación debe ser un número entero' })
  idNotificacion?: number;

  @IsNotEmpty({ message: 'El ID de usuario no puede estar vacío' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'El ID de usuario debe ser un número' })
  @IsInt({ message: 'El ID de usuario debe ser un número entero' })
  idUsuario: number | undefined;

  @IsNotEmpty({ message: 'El ID del stream no puede estar vacío' })
  @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'El ID de stream debe ser un número' })
  @IsInt({ message: 'El ID de stream debe ser un número entero' })
  idStream: number | undefined;

  @IsOptional()
  @IsNotEmpty({ message: 'El campo abierta no puede estar vacío' })
  @IsBoolean({ message: 'El campo para definir si se abrio la notificación debe ser un valor booleano' })
  abierta: boolean | undefined = false;
  
  @IsOptional()
  @IsNotEmpty({ message: 'La hora de notificación no puede estar vacía' })
  @IsDate({ message: 'La hora a la que se abrió la notificación debe ser una fecha válida' })
  horaAbierta: Date | undefined = new Date("2003-12-30");

  constructor(idUsuario: number | undefined, idStream: number | undefined) {
    this.idUsuario = idUsuario;
    this.idStream = idStream;
  }

  static create(data: Partial<NotificacionDTO>) {
    const seguidor = new NotificacionDTO(
      data.idUsuario,
      data.idStream
    );
    return seguidor;
  }

}
