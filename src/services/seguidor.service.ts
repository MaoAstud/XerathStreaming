import { PrismaClient } from '@prisma/client';
import { IsNumber, validate } from 'class-validator';
import { SeguidorDTO } from '../DTOS/seguidor.dto'; // Importa el DTO de seguidor

const prisma = new PrismaClient();

export class SeguidorService {
  async crearSeguidor(datosSeguidor: any): Promise<any> {
    try {
        const seguidorDTO = SeguidorDTO.create(datosSeguidor);
        const errors = await validate(seguidorDTO);
    
        if (errors.length > 0) {
            console.log('Errores de validación:', );
            return { success: false, status: 400, message: 'Errores de validación', errors };
        }

      const usuarioExistente = await prisma.usuario.findUnique({
        where: { idUsuario: datosSeguidor.idUsuario },
      });

      const canalExistente = await prisma.canal.findUnique({
        where: { idCanal: datosSeguidor.idCanal },
      });

      if (!usuarioExistente) {
        return { success: false, status: 404, message: 'El usuario especificado no existe', errors };
      }

      if (!canalExistente) {
        return { success: false, status: 404, message: 'El canal especificado no existe', errors };
      }

      const seguidorExistente = await prisma.seguidor.findMany({
        where: { idUsuario: usuarioExistente.idUsuario, idCanal: canalExistente.idCanal},
      });

      if (seguidorExistente.length > 0) {
        return this.desactivarSeguidor(seguidorExistente[0].idSeguidor, true);
      } else {
        const seguidorCreado = await prisma.seguidor.create({
            data: {
              idUsuario: datosSeguidor.idUsuario,
              idCanal: datosSeguidor.idCanal
            },
          });
    
          return { success: true, status: 201, message: 'Seguidor creado correctamente', seguidor: seguidorCreado };
      }
    } catch (error:any) {
      console.error('Error al crear seguidor:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async obtenerSeguidorPorId(idSeguidor: number): Promise<any> {
    if (isNaN(idSeguidor)) {
        return{ success: false, status: 400, message: 'El ID del seguidor no es un número válido', errors: 'El ID del seguidor no es un número válido' };
    }
    try {
      const seguidor = await prisma.seguidor.findUnique({
        where: { idSeguidor },
      });

      if (!seguidor) {
        return { success: false, status: 404, message: 'Seguidor no encontrado', errors: 'Seguidor no encontrado' };
      }

      return { success: true, status: 200, message: 'Seguidor encontrado', seguidor };
    } catch (error:any) {
      console.error('Error al encontrar Seguidor:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async listarSeguidoresCanal(idCanal:number): Promise<any> {
    if (isNaN(idCanal)) {
        return{ success: false, status: 400, message: 'El ID del canal no es un número válido', errors: 'El ID del canal no es un número válido' };
    }
    try {
      const seguidores = await prisma.seguidor.findMany({
        where: { idCanal }
      });

      return { success: true, status: 200, message: 'Seguidores obtenidos exitosamente', seguidores };
    } catch (error:any) {
      console.error('Error al listar Seguidores:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async listarSeguidoresUsuario(idUsuario:number): Promise<any> {
    if (isNaN(idUsuario)) {
        return{ success: false, status: 400, message: 'El ID del usuario no es un número válido', errors: 'El ID del usuario no es un número válido' };
    }
    try {
      const seguidores = await prisma.seguidor.findMany({
        where: { idUsuario }
      });

      return { success: true, status: 200, message: 'Seguidos obtenidos exitosamente', seguidores };
    } catch (error:any) {
      console.error('Error al listar Seguidores:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async desactivarSeguidor(idSeguidor: number, activo: boolean): Promise<any> {
    if (isNaN(idSeguidor)) {
        return{ success: false, status: 400, message: 'El ID del seguidor no es un número válido', errors: 'El ID del seguidor no es un número válido' };
    }
    try {
        const seguidorExistente = await prisma.seguidor.findUnique({
            where: { idSeguidor: idSeguidor },
          });
    
        if (!seguidorExistente) {
            return { success: false, status: 404, message: 'El seguidor especificado no existe', errors: 'El seguidor especificado no existe' };
        }
        
        const seguidorDTO = new SeguidorDTO(
            seguidorExistente.idUsuario,
            seguidorExistente.idCanal,
            
        );
        seguidorDTO.activo = activo;
        const errors = await validate(seguidorDTO);
    
        if (errors.length > 0) {
            console.log('Errores de validación:', );
            return { success: false, status: 400, message: 'Errores de validación', errors };
        }

      const seguidor = await prisma.seguidor.update({
        where: { idSeguidor },
        data: {
            idUsuario: seguidorDTO.idUsuario,
            idCanal: seguidorDTO.idCanal,
            activo: seguidorDTO.activo
        },
      });

      console.log('Seguidor actualizado:', seguidor);
      return { success: true, status: 200, message: 'Seguidor actualizado exitosamente', seguidor };
    } catch (error:any) {
      console.error('Error al actualizar seguidor:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }
}
