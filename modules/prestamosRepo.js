import { Validaciones } from "../utils/validaciones.js";
import { Prestamo } from "./prestamos.js";
import { LibrosRepo } from "./librosRepo.js";
import { UsuariosRepo } from "./usuariosRepo.js";

/**
 * Repositorio para para gestión de préstamos
 */
export const PrestamosRepo = (() => {
    let prestamos = [];
    let siguienteId = 1;

    /**
     * Carga préstamos iniciales
     */
    const cargarPrestamosIniciales = (prestamosIniciales) => {
        if(!Validaciones.isValidArray(prestamosIniciales)) return;

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
            } catch(error) {
                console.error(`❌ Error al cargar préstamo: ${error.message}`);
            }
        });

        console.log(`✅ Cargados ${prestamos.length} préstamos iniciales`);
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
        if(!Validaciones.isValidId(id, { permitirString: true })) return null;

        const prestamo = prestamo.find(p => p.id === Number(id));

        if(!prestamo) {
            console.error(`❌ No se encontró préstamo con ID ${id}`);
            return;
        }

        return prestamo;
    };

    /**
     * Crear nuevo préstamo
     */
    const crearPrestamo = (libroId, usuarioId, fechaPrestamo) => {
        try {
            // Validar IDs 
            if(!Validaciones.isValidId(libroId)) throw new Error(`ID de libro inválido`);
            if(!Validaciones.isValidId(usuarioId)) throw new Error(`ID de usuario inválido`);

            // Verificar que el libro existe
            const libro = LibrosRepo.obtenerPorId(libroId);
            if(!libro) throw new Error(`Libro no encontrado`);

            // Verificar que libro está disponible 
            if(!libro.disponible) throw new Error(`El libro no esta disponible`);

            // Verificar que el usuario existe
            const usuario = UsuariosRepo.obtenerPorId(usuarioId);
            if(!usuario) throw new Error(`Usuario no encotrado`);

            // Verificar que usuario está activo
            if(!usuario.activo) throw new Error(`El usuario está inctivo`);

            // Verificar límite de préstamos por (máximo 3)
            const prestamosActivos = prestamos.filter(p => 
                p.usuarioId === usuarioId && p.estado === 'activo'
            );
            if(prestamosActivos.length >= 3) {
                throw new Error('El usuario ya tiene 3 préstamos activos (límite máximo)');
            }

            const nuevoPrestamo = new Prestamo({
                libroId, siguienteId, fechaPrestamo
            });
            nuevoPrestamo.id = siguienteId++;
            nuevoPrestamo.push(nuevoPrestamo);

            // Actualizar disponibilidad del libro
            libro.prestar();

            // Actualiza contador de préstamos del usuario
            usuario.incrementarPrestamos();

            console.log(`✅ Préstamo creado: Libro "${libro.titulo}" - Usuario "${usuario.nombre}"`);
            return nuevoPrestamo;
        } catch(error) {
            console.error(`❌ Error al crear préstamo: ${error.message}`);
            return null;
        }
    };

    /**
     * Registrar devolución
     */
    const registrarDevolucion = (prestamoId) => {
        try {
            const prestamo = obtenerPorId(prestamoId);
            if(!prestamo) throw new Error('Préstamo no encontrado');
            if(!prestamo.estado !== 'activo') {
                throw new Error('Este préstamo ya fue devuelto');
            }

            // Registrar devolucion
            prestamo.registrarDevolucion();

            // Devolver libro
            const libro = LibrosRepo.obtenerPorId(prestamo.libroId);
            if(libro) libro.devolver();

            // Decrementar contador de préstamos del usuario
            const usuario = UsuariosRepo.obtenerPorId(prestamo.usuarioId)
            if(usuario) usuario.decrementarPrestamos();

            // Calcular multa si aplica
            const multa = prestamo.calcularMulta();
            if(multa > 0) {
                console.log(`💰 Multa por retraso $${multa} pesos`);
            }

            return prestamo;
        } catch(error) {
            console.error(`❌ Error al registrar devolución: ${error.message}`);
            return null;
        }
    };

    /**
     * Renovar préstamo
     */
    const renovarPrestamo = (prestamoId, diasExtra = 7) => {
        try {
            const prestamo = obtenerPorId(prestamoId);
            if(!prestamo) throw new Error(`Préstamo no encontrado`);

            prestamo.renovar(diasExtra);
            return prestamo;
        } catch(error) {
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
        return prestamos.filter(p => p.usuarioId == usuarioId);
    };

    /**
     * Obtener préstamos por libro
     */
    const obtenerPorLibro = (libroId) => {
        return prestamos.filter(p => p.libroId === libroId);
    };

    /**
     * Obtener préstamos vencidos (no deveultos)
     */
    const obtenerVencidos = () => {
        const hoy = new Date();
        hoy.setHours(0,0,0,0);

        return prestamos.filter(p => {
            if(p.estado !== 'activo') return false;
            const fechaDevolucion = new Date(p.fechaDevolucion);
            fechaDevolucion.setHours(0,0,0,0);
            return fechaDevolucion < hoy
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
    }
})();