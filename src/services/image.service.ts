import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ImageService{

    async postImagenUsuario(idUsuario: number, img: any): Promise<any> {
        try {
          const usuario = await prisma.usuario.update({
            where: { idUsuario },
            data: { imagenUsuario: img },
          });
    
          console.log('Usuario actualizado:', usuario);
          return { success: true, status: 200, message: 'Foto de perfil actualizada exitosamente', usuario };
        } catch (error:any) {
          console.error('Error al actualizar Usuario:', error);
          return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
        } finally {
          await prisma.$disconnect();
        }
    }

    async getImagenUsuario(idUsuario: number): Promise<any> {
        try {
          const usuario = await prisma.usuario.findUnique({
            where: { idUsuario },
            select: { imagenUsuario: true },
          });
    
          if (usuario && usuario.imagenUsuario) {
            return { success: true, status: 200, message: 'Foto de perfil encontrada exitosamente', usuario };
          } 
          return { success: false, status: 400, message: 'Foto de perfil no encontrada', usuario, errors: 'Foto de perfil no encontrada' };
        } catch (error:any) {
          console.error('Error al buscar imagen Usuario:', error);
          return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
        } finally {
          await prisma.$disconnect();
        }
    }

    async postBanner(idCanal: number, img: any): Promise<any> {
        try {
          const canal = await prisma.canal.update({
            where: { idCanal },
            data: { bannerCanal: img },
          });
    
          console.log('Canal actualizado:', canal);
          return { success: true, status: 200, message: 'Banner actualizado exitosamente', canal };
        } catch (error:any) {
          console.error('Error al actualizar canal:', error);
          return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
        } finally {
          await prisma.$disconnect();
        }
    }

    async getBanner(idCanal: number): Promise<any> {
        try {
          const canal = await prisma.canal.findUnique({
            where: { idCanal },
            select: { bannerCanal: true },
          });
    
          if (canal && canal.bannerCanal) {
            return { success: true, status: 200, message: 'Banner encontrado exitosamente', canal };
          } 
          return { success: false, status: 400, message: 'Banner no encontrado', canal, errors: 'Banner no encontrado' };
        } catch (error:any) {
          console.error('Error al buscar banner Canal:', error);
          return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
        } finally {
          await prisma.$disconnect();
        }
    }
}