import { Validaciones } from '../utils/validaciones.js';

/**
 * Clase que representa un préstamos en el sistema
 */
export class Prestamo {
    /**
     * Constructor de la clase Prestamo
     * @param {Object} datos - Datos del préstamo
     * @param {number} datos.libroId - ID del libro
     * @param {number} datos.usuarioId - ID del usuario
     * @param {string} datos.fechaPrestamo - Fecha del préstamos (YYYY-MM-DD)
     * @param {number} datos.diasPrestamo - Días de préstamo (por defecto: 14)
     */
    constructor(datos, diasPrestamo = 14) {
        // Validaciones
        if(!Validaciones.isValidId(datos.libroId)) {
            throw new Error(`ID de libro inválido`);
        }

        if(!Validaciones.isValidId(datos.usuarioId)) {
            throw new Error('ID de usuario inválido');
        }

        if(!Validaciones.isValidString(datos.fechaPrestamo, true)) {
            throw new Error('Fecha de préstamo inválida');
        }

        // Propiedades
        this.id = null,
        this.libroId = datos.libroId,
        this.usuarioId = datos.usuarioId,
        this.fechaPrestamo = datos.fechaPrestamo,
        this.fechaDevolucion = this.calcularFechaDevolucion(datos.fechaPrestamo, diasPrestamo);
        this.fechaRealDevolucion = null;
        this.estado = 'activo';
        this.renovaciones = 0;
    }

    /**
     * Calcular fecha devolución
     */
    calcularFechaDevolucion(fechaPrestamo, dias) {
        const fecha = new Date(fechaPrestamo);
        fecha.setDate(fecha.getDate() + dias);
        return fecha.toISOString().split('T')[0];
    }

    /**
     * Convierte a objeto plano
     */
    toJSON(){
        return {
            id: this.id,
            libroId: this.libroId,
            usuarioId: this.usuarioId,
            fechaPrestamo: this.fechaPrestamo,
            fechaDevolucion: this.fechaDevolucion,
            fechaRealDevolucion: this.fechaRealDevolucion,
            estado: this.estado,
            renovaciones: this.renovaciones
        }
    }

    registrarDevolucion() {
        if(this.estado !== 'activo') {
            throw new Error('Este préstamo ya está devuelto o cancelado');
        }

        this.fechaDevolucion = new Date().toISOString().split('T')[0];
        this.estado = 'devuelto';

        console.log(`✅ Préstamo ID ${this.id} devuelto`);

        return this;
    }

    /**
     * Renovar préstamo
     */
    renovar(diasExtra = 7) {
        if(this.estado !== 'activo') {
            throw new Error('Solo se pueden renovar préstamos activos');
        }
        
        if(this.renovaciones >= 2) {
            throw new Error('Máximo 2 renovaciones permitidas');
        }

        const nuevaFecha = new Date(this.fechaDevolucion);
        nuevaFecha.setDate(nuevaFecha.getDate() + diasExtra);
        this.fechaDevolucion = nuevaFecha.toISOString().split('T')[0];
        this.renovaciones++;

        console.log(`✅ Préstamo ID ${this.id} renovado. Nueva fecha: ${this.fechaDevolucion}`);
        return this;
    }

    /**
     * Calcular días de retraso
     */
    calcularRetraso() {
        if(this.estado !== 'activo') return 0;

        const hoy = new Date();
        const fechaDevolucion = new Date(this.fechaDevolucion);
        hoy.setHours(0,0,0,0);
        fechaDevolucion.setHours(0,0,0,0);

        if(hoy <= fechaDevolucion) return 0;

        const diferencia = hoy - fechaDevolucion;
        return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
    }

    /**
     * Calcular multa (5 pesos por día de retraso)
     */
    calcularMulta() {
        const diasRetraso = this.calcularRetraso();
        return diasRetraso * 5;
    }
}