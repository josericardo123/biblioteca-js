import { Validaciones } from '../utils/validaciones.js';

/**
 * Clase que representa un usuario en el sistema
 */
export class Usuario {
    /**
     * Constructor de la clase Usuario
     * @param {Object} datos - Datos del usuario
     * @param {string} datos.nombre - Nombre completo
     * @param {string} datos.email - Email del usuario
     * @param {string} datos.telefono - Télefono del contacto
     */
    constructor(datos) {
        // Validaciones 
        if(!Validaciones.isValidString(datos.nombre, 3, 100)) {
            throw new Error('Nombre inválido (mínimo 3 caracteres)');
        }

        if(!Validaciones.isValidEmail(datos.email)) {
            throw new Error('Email inválido');
        }

        if(!Validaciones.isValidString(datos.telefono, 7, 20)) {
            throw new Error('Teléfono inválido 1');
        }

        // Propiedades del usuario
        this.id = datos.null;
        this.nombre = datos.nombre.trim();
        this.email = datos.email.toLowerCase().trim();
        this.telefono = datos.telefono.trim();
        this.fechaRegistro = new Date().toISOString().split('T')[0];
        this.activo = true;
        this.prestamosActivos = 0;
    }   

    /**
     * Convierte al usuario en objeto plano
     * @returns {Object} Objeto con los datos del usuario
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            telefono: this.telefono,
            fechaRegistro: this.fechaRegistro,
            activo: this.activo,
            prestamosActivos: this.prestamosActivos
        };
    }

    /**
     * Incrementa el contador de préstamos activos
     */
    incrementarPrestamos() {
        this.prestamosActivos++;
        console.log(`📚 Usuario "${this.nombre}" tiebe ${this.prestamosActivos} préstamo(s) activo(s)`);
    }

    /**
     * Decrementa el contador de préstamos activos
     */
    decrementarPrestamos() {
        if(this.prestamosActivos > 0) {
            this.prestamosActivos--;
            console.log(`📚 Usuario "${this.nombre}" tiene ${this.prestamosActivos} Préstamo(s) activo(s)`);
        }
    }

    /**
     * Desactiva el usuario
     */
    desactivar() {
        if(!this.activo) {
            throw new Error('El usuario ya esta desactivado');
        }

        this.activo = false;
        console.log(`❌ Usuario "${this.nombre}" desactivado`);
    }

    /**
     * Activar el usuario
     */
    activar() {
        if(this.activo) {
            throw new Error('El usuario ya está activo');
        }

        this.activo = true;
        console.log(`✅ Usuario "${this.nombre}" activado`);
    }


}