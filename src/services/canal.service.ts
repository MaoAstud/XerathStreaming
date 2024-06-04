import { PrismaClient } from '@prisma/client';
import { validate } from 'class-validator';
import { CanalDTO } from '../DTOS/canal.dto';

const prisma = new PrismaClient();

export class CanalService {

  async crearCanal(canalJason: any): Promise<any> {
    const canalDTO = CanalDTO.create(canalJason);
    const errors = await validate(canalDTO);

    if (errors.length > 0) {
        console.log('Errores de validación:', );
        return { success: false, status: 400, message: 'Errores de validación', errors };
    }

    try {
      const nombreUtilizado = await prisma.canal.findFirst(
        {
          where:{nombreCanal: canalDTO.nombreCanal}
        }
      )
      if (nombreUtilizado) {
        return { success: false, status: 400, message: 'El nombre del canal ya esta en uso', errors };
      }
      const canalCreado = await prisma.canal.create({
        data: {
          nombreCanal: canalDTO.nombreCanal,
          descripcionCanal: canalDTO.descripcionCanal,
          billeteraCanal: canalDTO.billeteraCanal,
          idUsuario: canalDTO.idUsuario
        },
      });
      return { success: true, status: 201, message: 'Canal creado correctamente', canal: canalCreado };

    } catch (error:any) {
      console.error('Error al crear canal:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async obtenerCanalPorId(idCanal: number): Promise<any> {
    if (isNaN(idCanal)) {
      return{ success: false, status: 400, message: 'El ID del canal no es un número válido', errors: 'El ID del canal no es un número válido' };
    }
    try {

      const canal = await prisma.canal.findFirstOrThrow({
        where: { idUsuario: idCanal },
      });

      if (!canal) {
        return { success: false, status: 404, message: 'Canal no encontrado', errors: 'Usuario no encontrado' };
      }
      return { success: true, status: 200, message: 'Canal encontrado', canal };

    } catch (error:any) {
      console.error('Error al obtener canal por ID:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async actualizarCanal(idCanal: number, canalJson: any): Promise<any> {
    const canalDTO = CanalDTO.update(idCanal, canalJson);
    const errors = await validate(canalDTO);

    if (errors.length > 0) {
        console.log('Errores de validación:', errors);
        return { success: false, status: 400, message: 'Errores de validación', errors };
    }

    try {
      const canal = await prisma.canal.update({
        where: { idCanal },
        data: {
            nombreCanal: canalDTO.nombreCanal,
            descripcionCanal: canalDTO.descripcionCanal,
            billeteraCanal: canalDTO.billeteraCanal,
          },
      });

      console.log('Canal actualizado:', canal);
      return { success: true, status: 200, message: 'Canal actualizado exitosamente', canal };
    } catch (error:any) {
      console.error('Error al actualizar Canal:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async buscarCanalesPorNombre(): Promise<any> {
    try {
      const canales = await prisma.canal.findMany({
      });

      return { success: true, status: 200, message: 'Canales encontrados', canales };
    } catch (error:any) {
      console.error('Error al buscar canales por nombre:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }
}