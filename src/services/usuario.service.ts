import { PrismaClient } from '@prisma/client';
import { validate } from 'class-validator';
import { UsuarioDTO } from '../DTOS/usuario.dto';

const prisma = new PrismaClient();

export class UsuarioService {
  async crearUsuario(usuarioJson: any): Promise<any> {
    const usuarioDTO = UsuarioDTO.create(usuarioJson);
    const errors = await validate(usuarioDTO);

    if (errors.length > 0) {
        console.log('Errores de validación:', );
        return { success: false, status: 400, message: 'Errores de validación', errors };
    }

    try {
      const nombreUtilizado = await prisma.usuario.findFirst(
        {
          where:{nombreUsuario: usuarioDTO.nombreUsuario}
        }
      )

      const correoUtilizado = await prisma.usuario.findFirst(
        {
          where:{email: usuarioDTO.email}
        }
      )

      if (nombreUtilizado) {
        return { success: false, status: 400, message: 'El nombre de usuario ya esta en uso', errors };
      }

      if (correoUtilizado) {
        return { success: false, status: 400, message: 'El correo ya esta en uso', errors };
      }
      const usuario = await prisma.usuario.create({
        data: {
          nombreUsuario: usuarioDTO.nombreUsuario,
          email: usuarioDTO.email,
          contrasena: usuarioDTO.contrasena,
        },
      });

      console.log('Usuario creado:', usuario);
      return { success: true, status: 201, message: 'Usuario creado exitosamente', usuario };
    } catch (error:any) {
      console.error('Error al crear usuario:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async actualizarUsuario(idUsuario: number, usuarioJson: any): Promise<any> {
    const usuarioDTO = UsuarioDTO.update(idUsuario, usuarioJson);
    const errors = await validate(usuarioDTO);

    if (errors.length > 0) {
        console.log('Errores de validación:', );
        return { success: false, status: 400, message: 'Errores de validación', errors };
    }

    try {
      const usuario = await prisma.usuario.update({
        where: { idUsuario },
        data: {
            nombreUsuario: usuarioDTO.nombreUsuario,
            email: usuarioDTO.email,
            contrasena: usuarioDTO.contrasena,
          },
      });

      console.log('Usuario actualizado:', usuario);
      return { success: true, status: 200, message: 'Usuario actualizado exitosamente', usuario };
    } catch (error:any) {
      console.error('Error al actualizar usuario:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async listarUsuarios(): Promise<any> {
    try {
      const usuarios = await prisma.usuario.findMany({
        select: {
          idUsuario: true,
          nombreUsuario: true,
          email: true,
        },
      });

      return { success: true, status: 200, message: 'Usuarios obtenidos exitosamente', usuarios };
    } catch (error:any) {
      console.error('Error al listar usuarios:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async UsuarioPorId(idUsuario: number): Promise<any> {
    if (isNaN(idUsuario)) {
      return{ success: false, status: 400, message: 'El ID del usuario no es un número válido', errors: 'El ID del usuario no es un número válido' };
  }
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { idUsuario },
        select: {
          idUsuario: true,
          nombreUsuario: true,
          email: true,
        },
      });

      if (!usuario) {
        return { success: false, status: 404, message: 'Usuario no encontrado', errors: 'Usuario no encontrado' };
      }

      return { success: true, status: 200, message: 'Usuario encontrado', usuario };
    } catch (error:any) {
      console.error('Error al encontrar usuario:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }

  async inicioSesion(email: string, contrasena: string): Promise<any> {
    try {
      const usuario = await prisma.usuario.findFirst({
        where: { email, contrasena },
      });

      if (!usuario) {
        return { success: false, status: 404, message: 'Usuario no registrado', errors: 'Usuario no registrado' };
      }

      return { success: true, status: 200, message: 'Inicio de sesion Correcto', usuario };
    } catch (error:any) {
      console.error('Error al encontrar usuario:', error);
      return { success: false, status: 500, message: 'Error interno del servidor', errors: error.message };
    } finally {
      await prisma.$disconnect();
    }
  }
}