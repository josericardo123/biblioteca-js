import { Validaciones } from "../utils/validaciones.js";
import { Prestamo } from "./prestamos.js";
import { LibrosRepo } from "./librosRepo.js";
import { UsuariosRepo } from "./usuariosRepo.js";
import { Persistencia } from "../utils/persistencia.js";

/**
 * Repositorio para gestión de préstamos
 */
export const PrestamosRepo = (() => {
    let prestamos = [];
    let siguienteId = 1;

    const guardarEnStorage = () => {
        const dataParaGuardar = prestamos.map(prestamo => prestamo.toJSON());
        Persistencia.guardar(Persistencia.KEYS.PRESTAMOS, dataParaGuardar);
    };
    
    /**
     * Carga préstamos iniciales
     */
    const cargarPrestamosIniciales = (prestamosIniciales) => {
        const datosGuardados = Persistencia.cargar(Persistencia.KEYS.PRESTAMOS);

        if(datosGuardados && datosGuardados.length > 0) {
            datosGuardados.forEach(prestamoData => {
                const prestamo = new Prestamo({
                    libroId: prestamoData.libroId,
                    usuarioId: prestamoData.usuarioId,
                    fechaPrestamo: prestamoData.fechaPrestamo
                });
                prestamo.id = prestamoData.id;
                prestamo.fechaDevolucion = prestamoData.fechaDevolucion;
                prestamo.estado = prestamoData.estado;
                prestamo.renovaciones = prestamoData.renovaciones;
                prestamo.fechaRealDevolucion = prestamoData.fechaRealDevolucion;
                prestamos.push(prestamo);
                if(prestamo.id >= siguienteId) {
                    siguienteId = prestamo.id + 1;
                }
            });
            console.log(`✅ Cargados ${prestamos.length} préstamos desde localStorage`);
        } else {
            if (!Validaciones.isValidArray(prestamosIniciales)) return;

            prestamosIniciales.forEach(prestamoData => {
                try {
                    const prestamo = new Prestamo({
                        libroId: prestamoData.libroId,
                        usuarioId: prestamoData.usuarioId,
                        fechaPrestamo: prestamoData.fechaPrestamo
                    });
                    prestamo.id = siguienteId++;
                    prestamo.fechaDevolucion = prestamoData.fechaDevolucion;
                    prestamo.estado = prestamoData.estado;
                    prestamo.renovaciones = prestamoData.renovaciones;
                    prestamo.fechaRealDevolucion = prestamoData.fechaRealDevolucion;
                    prestamos.push(prestamo);
                } catch (error) {
                    console.error(`❌ Error al cargar préstamo: ${error.message}`);
                }
            });

            console.log(`✅ Cargados ${prestamos.length} préstamos iniciales`);
            guardarEnStorage();
        }
    };

    /**
     * Obtiene todos los préstamos
     */
    const obtenerTodos = () => {
        return [...prestamos];
    };

    /**
     * Buscar préstamos por ID
     */
    const obtenerPorId = (id) => {
        console.log(`🔍 obtenerPorId llamado con ID: ${id}, tipo: ${typeof id}`);
        
        if (id === null || id === undefined) {
            console.error('❌ obtenerPorId: ID es null o undefined');
            return null;
        }
        
        const idNumerico = Number(id);
        if (isNaN(idNumerico) || idNumerico <= 0) {
            console.error(`❌ obtenerPorId: ID inválido: ${id} -> ${idNumerico}`);
            return null;
        }
        
        const prestamo = prestamos.find(p => p.id === idNumerico);
        
        if (!prestamo) {
            console.log(`❌ No se encontró préstamo con ID ${idNumerico}`);
            return null;
        }
        
        console.log(`✅ Préstamo encontrado: ${prestamo.id}`);
        return prestamo;
    };

    /**
     * Crear nuevo préstamo
     */
    const crearPrestamo = (libroId, usuarioId, fechaPrestamo) => {
        try {
            // Validar IDs 
            if (!Validaciones.isValidId(libroId)) throw new Error(`ID de libro inválido`);
            if (!Validaciones.isValidId(usuarioId)) throw new Error(`ID de usuario inválido`);

            // Verificar que el libro existe
            const libro = LibrosRepo.obtenerPorId(libroId);
            if (!libro) throw new Error(`Libro no encontrado`);

            // Verificar que libro está disponible 
            if (!libro.disponible) throw new Error(`El libro no está disponible`);

            // Verificar que el usuario existe
            const usuario = UsuariosRepo.obtenerPorId(usuarioId);
            if (!usuario) throw new Error(`Usuario no encontrado`);

            // Verificar que usuario está activo
            if (!usuario.activo) throw new Error(`El usuario está inactivo`);

            // Verificar límite de préstamos por usuario (máximo 3)
            const prestamosActivos = prestamos.filter(p => 
                p.usuarioId === usuarioId && p.estado === 'activo'
            );
            if (prestamosActivos.length >= 3) {
                throw new Error('El usuario ya tiene 3 préstamos activos (límite máximo)');
            }

            // ✅ CORREGIDO: Crear préstamo con los datos correctos
            const nuevoPrestamo = new Prestamo({
                libroId: libroId,
                usuarioId: usuarioId,
                fechaPrestamo: fechaPrestamo
            });
            
            // ✅ CORREGIDO: Asignar ID y agregar al array
            nuevoPrestamo.id = siguienteId++;
            prestamos.push(nuevoPrestamo);

            // Actualizar disponibilidad del libro
            libro.prestar();

            // Actualizar contador de préstamos del usuario
            usuario.incrementarPrestamos();

            guardarEnStorage();

            console.log(`✅ Préstamo creado: Libro "${libro.titulo}" → Usuario "${usuario.nombre}"`);
            return nuevoPrestamo;
            
        } catch (error) {
            console.error(`❌ Error al crear préstamo: ${error.message}`);
            return null;
        }
    };

    /**
     * Registrar devolución
     */
    const registrarDevolucion = (prestamoId) => {
        console.log(`📖 registrarDevolucion llamado con ID: ${prestamoId}, tipo: ${typeof prestamoId}`);
        
        if (!prestamoId || isNaN(prestamoId) || prestamoId <= 0) {
            console.error(`❌ ID de préstamo inválido: ${prestamoId}`);
            return null;
        }
        
        try {
            const prestamo = obtenerPorId(prestamoId);
            if (!prestamo) throw new Error(`Préstamo no encontrado con ID: ${prestamoId}`);
            
            if (prestamo.estado !== 'activo') {
                throw new Error('Este préstamo ya fue devuelto');
            }

            // Registrar devolución
            prestamo.registrarDevolucion();

            // Devolver libro
            const libro = LibrosRepo.obtenerPorId(prestamo.libroId);
            if (libro && !libro.disponible) {
                libro.devolver();
            } else if (libro && libro.disponible) {
                console.log(`⚠️ El libro "${libro.titulo}" ya estaba disponible, no se modificó`);
            }

            // Decrementar contador de préstamos del usuario
            const usuario = UsuariosRepo.obtenerPorId(prestamo.usuarioId);
            if (usuario) usuario.decrementarPrestamos();

            // Calcular multa si aplica (solo console.log, no mostrarMensaje)
            const multa = prestamo.calcularMulta();
            if (multa > 0) {
                console.log(`💰 Multa por retraso: $${multa} pesos`);
            }

            guardarEnStorage();

            return prestamo;
            
        } catch (error) {
            console.error(`❌ Error al registrar devolución: ${error.message}`);
            return null;
        }
    };

    /**
     * Renovar préstamo
     */
    const renovarPrestamo = (prestamoId, diasExtra = 7) => {
        console.log(`🔄 Renovar préstamo llamado con ID: ${prestamoId}`);
        
        if (!prestamoId || isNaN(prestamoId) || prestamoId <= 0) {
            console.error(`❌ ID de préstamo inválido: ${prestamoId}`);
            return null;
        }
        
        try {
            const prestamo = obtenerPorId(prestamoId);
            if (!prestamo) throw new Error(`Préstamo no encontrado con ID: ${prestamoId}`);

            prestamo.renovar(diasExtra);
            guardarEnStorage();
            console.log(`✅ Préstamo ${prestamoId} renovado hasta: ${prestamo.fechaDevolucion}`);
            return prestamo;
            
        } catch (error) {
            console.error(`❌ Error al renovar préstamo: ${error.message}`);
            return null;
        }
    };

    /**
     * Obtener préstamos activos
     */
    const obtenerActivos = () => {
        return prestamos.filter(p => p.estado === 'activo');
    };

    /**
     * Obtener préstamos por usuario
     */
    const obtenerPorUsuario = (usuarioId) => {
        return prestamos.filter(p => p.usuarioId === usuarioId);
    };

    /**
     * Obtener préstamos por libro
     */
    const obtenerPorLibro = (libroId) => {
        return prestamos.filter(p => p.libroId === libroId);
    };

    /**
     * Obtener préstamos vencidos (no devueltos)
     */
    const obtenerVencidos = () => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        return prestamos.filter(p => {
            if (p.estado !== 'activo') return false;
            const fechaDevolucion = new Date(p.fechaDevolucion);
            fechaDevolucion.setHours(0, 0, 0, 0);
            return fechaDevolucion < hoy;
        });
    };

    return {
        cargarPrestamosIniciales,
        obtenerTodos,
        obtenerPorId,
        crearPrestamo,
        registrarDevolucion,
        renovarPrestamo,
        obtenerActivos,
        obtenerPorUsuario,
        obtenerPorLibro,
        obtenerVencidos
    };
})();