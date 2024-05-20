import { PrismaClient } from '@prisma/client';
import { validate } from 'class-validator';
import { NotificacionDTO } from '../DTOS/notificacion.dto';

const prisma = new PrismaClient();

export class NotificacionService {

  async crearNotificacion(notiJson: any): Promise<any> {
    const notificacionDTO = NotificacionDTO.create(notiJson);
    const errors = await validate(notificacionDTO);

    if (errors.length > 0) {
        console.log('Errores de validación:', );
        return { success: false, status: 400, message: 'Errores de validación', errors };
    }

    try {
      const notiCreada = await prisma.notificacion.create({
        data: {
            idStream: notiJson.idStream,
            idUsuario: notiJson.idUsuario,
            abierta: notiJson.abierta,
            horaAbierta: notiJson.horaAbierta!
        },
      });
      return { success: true, status: 201, message: 'Notificación creada correctamente', notificacion: notiCreada };

    } catch (error:any) {
      console.error('Error al crear Notificación:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async obtenerNotificacionPorId(idUsuario: number): Promise<any> {
    if (isNaN(idUsuario)) {
      return{ success: false, status: 400, message: 'El ID del usuario no es un número válido', errors: 'El ID del usuario no es un número válido' };
    }
    try {

      const usuario = await prisma.usuario.findUnique({
        where: { idUsuario },
      });

      if (!usuario) {
        return { success: false, status: 404, message: 'Usuario no encontrado', errors: 'Usuario no encontrado' };
      }

      const notificaciones = await prisma.notificacion.findMany({
        where: { idUsuario }
      });
      return { success: true, status: 200, message: 'Canal encontrado', notificaciones };

    } catch (error:any) {
      console.error('Error al obtener notificaciones por ID:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async actualizarNotificacion(idNotificacion: number): Promise<any> {
    if (isNaN(idNotificacion)) {
        return{ success: false, status: 400, message: 'El ID de la notificacion no es un número válido', errors: 'El ID de la notifiacion no es un número válido' };
    }

    try {
      const notificacion = await prisma.notificacion.update({
        where: { idNotificacion },
        data: {
            abierta: true,
            horaAbierta: new Date(),
          },
      });

      console.log('Notificación actualizada:', notificacion);
      return { success: true, status: 200, message: 'Notificación actualizada exitosamente', notificacion };
    } catch (error:any) {
      console.error('Error al actualizar notificacación:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

}