import { Validaciones } from "../utils/validaciones.js";
import { Usuario } from "./usuarios.js";
import { Persistencia } from "../utils/persistencia.js";

/**
 * Repositorio para la gestión de usuarios
 */

export const UsuariosRepo = (() => {
    let usuarios = [];
    let siguienteId = 1;

    // Agregar guardarEnStorage y llamar después de cada modificación
    const guardarEnStorage = () => {
        const dataParaGuardar = usuarios.map(usuario => usuario.toJSON());
        Persistencia.guardar(Persistencia.KEYS.USUARIOS, dataParaGuardar);
    };

    /**
     * Carga los usuarios iniciales
     */
    const cargarUsuariosIniciales = (usuariosIniciales) => {
        const datosGuardados = Persistencia.cargar(Persistencia.KEYS.USUARIOS);

        if(datosGuardados && datosGuardados.length > 0) {
            datosGuardados.forEach(usuarioData => {
                const usuario = new Usuario(usuarioData);
                usuario.id = usuarioData.id;
                usuario.fechaRegistro = usuarioData.fechaRegistro;
                usuario.prestamosActivos = usuarioData.prestamosActivos;
                usuarios.push(usuario);
                if(usuario.id >= siguienteId) {
                    siguienteId = usuario.id + 1;
                }
            });
        } else {
            if(!Validaciones.isValidArray(usuariosIniciales)) return;

            usuariosIniciales.forEach(usuarioData => {
                try {
                    const usuario = new Usuario(usuarioData);
                    usuario.id = siguienteId++;
                    usuario.fechaRegistro = usuarioData.fechaRegistro || usuario.fechaRegistro;
                    usuario.prestamosActivos = usuarioData.prestamosActivos || 0;
                    usuarios.push(usuario);

                } catch(error) {
                    console.error(`❌ Error al cargar usuario: ${error.message}`);
                }
            });

            console.log(`✅ Cargados ${usuarios.length} usuarios iniciales`);
            guardarEnStorage();
        }
    };

    /**
     * Obtiene todos los usuarios
     */
    const obtenerTodos = () => {
        return [...usuarios];
    };

    /**
     * Busca un usuario por ID
     */
    const obtenerPorId = (id) => {
        if(!Validaciones.isValidId(id, {permitirString: true})) return null;
        const idNumerico = Number(id);
        const usuario = usuarios.find(u => u.id === idNumerico);
        if(!usuario) {
            console.log(`❌ No se encontro usuario con ID ${id}`);
            return null;
        }

        return usuario;
    };

    /**
     * Busca un usuario por email
     */
    const obtenerPorEmail = (email) => {
        if(!Validaciones.isValidEmail(email)) return null;

        return usuarios.find(u => u.email === email.toLowerCase().trim());
    };

    /**
     * Agregar un nuevo usuario
     */
    const agregar = (datosUsuario) => {
        try {
            if(!datosUsuario || typeof datosUsuario !== 'object') {
                throw new Error(`Datos de usuario inválido`);
            }

            // Verificar email único
            const emailExistente = usuarios.some(u => u.email === datosUsuario.email.toLowerCase().trim());

            if(emailExistente) {
                throw new Error(`Ya existe un usuario con email ${datosUsuario.email}`);
            }

            const nuevoUsuario = new Usuario(datosUsuario);
            nuevoUsuario.id = siguienteId++;
            usuarios.push(nuevoUsuario);

             guardarEnStorage();

            console.log(`✅ Usuario "${nuevoUsuario.nombre}" agregado (ID: ${nuevoUsuario.id})`);
            return nuevoUsuario;
        } catch(error) {
            console.error(`❌ Error al agregar usuario: ${error.message}`);
            return null;
        }
    };

    /**
     * Actualiza un usuario existente
     */
    const actualizar = (id, datosActualizados) => {
        try {
            const usuario = obtenerPorId(id);
            if(!usuario) return null;

            // Validar y actualizar nombre
            if(datosActualizados.nombre) {
                if(!Validaciones.isValidString(datosActualizados.nombre, 3, 100)) {
                    throw new Error('Nombre inválido');
                }
                usuario.nombre = datosActualizados.nombre.trim();
            }

            // Validar y actualizar email (verifcado unicidad)
            if(datosActualizados.email) {
                if(!Validaciones.isValidEmail(datosActualizados.email)) {
                    throw new Error('Email inválido');
                }

                const emailLower = datosActualizados.email.toLowerCase().trim();
                const emailExistente = usuarios.some(u => u.email === emailLower && u.id !== usuario.id);
                if(emailExistente) {
                    throw new Error(`Ya existe un usuario con email ${datosActualizados.email}`);
                }

                usuario.email = emailLower;
            }

            // Validar y actualizar teléfono
            if(datosActualizados.telefono) {
                if(!Validaciones.isValidString(datosActualizados.telefono, 7, 20)) {
                    throw new Error('Télefono inválido');
                }

                usuario.telefono = datosActualizados.telefono.trim();
            }

            usuario.activo = datosActualizados.activo ? true : false;

             guardarEnStorage();

            console.log(`✅ Usuario ${usuario.nombre} actualizado`);
            return usuario;

        } catch(error) {
            console.error(`❌ Error al actualizar usuario: ${error.message}`);
            return null;
        }
    };

    /**
     * Elimina un usuario por ID (solo si no tiene préstamos activos)
     */
    const eliminar = (id) => {
        try {
            const usuario = obtenerPorId(id);
            if(!usuario) return false;
            if(usuario.prestamosActivos > 0) {
                throw new Error(`No se puede eliminar usuario con ${usuario.prestamosActivos} prestamo(s) activo(s)`);
            }

            const index = usuarios.findIndex(u => u.id === usuario.id);
            usuarios.splice(index, 1);

             guardarEnStorage();

            console.log(`✅ Usuario "${usuario.nombre}" eliminado (ID: ${usuario.id})`);
            return true;
        } catch(error) {
            console.error(`❌ Error al eliminar usuario: ${error.message}`);
            return false;
        }
    };

    /**
     * Busca usuarios por nombre o email
     */ 
    const buscar = (termino) => {
        if(!Validaciones.isValidString(termino, 1)) {
            console.log('❌ Término de búsqueda inválido');
            return [];
        }

        const terminoLower = termino.toLowerCase().trim();

        const resultados = usuarios.filter(usuario => 
            usuario.nombre.toLowerCase().includes(terminoLower) ||
            usuario.email.includes(terminoLower)
        );

        console.log(`🔍 Búsqueda "${termino}": ${resultados.length} resultado(s)`);
        return [...resultados];
    };

    /**
     * Obtiene usuarios activos
     */
    const obtenerActivos = () => {
        return usuarios.filter(usuario => usuario.activo);
    };

    /**
     * Obtiene usuarios inactivos
     */
    const obtenerInactivos = () => {
        return usuarios.filter(usuario => !usuario.activo)
    };

    return {
        cargarUsuariosIniciales,
        obtenerTodos,
        obtenerPorId,
        obtenerPorEmail,
        agregar,
        actualizar,
        eliminar,
        buscar,
        obtenerActivos,
        obtenerInactivos
    };
})();