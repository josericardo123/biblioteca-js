import { Validaciones } from "./utils/validaciones.js";

/**
 * Clase que representa un libros en el sistema
 */

export class Libro {
    /**
     * Constructor de la clase libro
     * @param {Object} datos - Datos del libros
     * @param {string} datos.titulo - Título del libro
     * @param {string} datos.autor - Autor el libro
     * @param {string} datos.isbn - ISBN del libro
     * @param {number} datos.anioPublicacion - Año de publicación
     */
    constructor(datos) {
        // Validaciones en el constructor
        if (!Validaciones.isValidString(datos.titulo, 1, 200)) {
            throw new Error("Título inválido");
        }

        if (!Validaciones.isValidString(datos.autor, 1, 100)) {
            throw new Error("Autor inválido");
        }

        if (!Validaciones.isValidISBN(datos.isbn)) {
            throw new Error("ISBN inválido");
        }

        if (
            !Validaciones.isValidNumber(datos.anioPublicacion, {
                min: 1000,
                max: new Date().getFullYear(),
                entero: true,
            })
        ) {
            throw new Error("Año de publicación inválido");
        }

        // Propiedades del libro
        this.id = null;
        this.titulo = datos.titulo.trim();
        this.autor = datos.autor.trim();
        this.isbn = datos.isbn;
        this.anioPublicacion = datos.anioPublicacion;
        this.disponible = true;
        this.fechaRegistro = new Date().toISOString().split("T")[0];
    }

    /**
     * Convierte el libro a objeto plano
     * @returns {Object} Objeto con los datos del libro
     */
    toJSON() {
        return {
            id: this.id,
            titulo: this.titulo,
            autor: this.autor,
            isbn: this.isbn,
            anioPublicacion: this.anioPublicacion,
            disponible: this.disponible,
            fechaRegistro: this.fechaRegistro,
        };
    }

    /**
     * Marca el libro como no disponible
     */
    prestar() {
        if (!this.disponible) {
            throw new Error("El libro ya está prestado");
        }
        this.disponible = false;
        console.log(`📖 Libro "${this.titulo}" prestado.`);
    }

    /**
     * Marca el libro como disponible
     */
    devolver() {
        if (this.disponible) {
            throw new Error("El libro ya está disponible");
        }

        this.disponible = true;
        console.log(`📖 Libro "${this.titulo}" devuelto`);
    }
}
