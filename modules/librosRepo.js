import { Validaciones } from "../utils/validaciones.js";
import { Libro } from "./libros.js";

/**
 * Repositorio para la gestión de libros
 * Patrón Repository - Encapsula la lógica de acceso a datos
 */

export const LibrosRepo = (() => {
    // Estado privado
    let libros = [];
    let siguienteId = 1;

    /**
     * Carga los libros iniciales desde los datos de ejemplo
     * @param {Array} librosIniciales - Array de objetos con datos de libros
     */
    const cargarLibrosIniciales = (librosIniciales) => {
        if (!Validaciones.isValidArray(librosIniciales)) return;

        librosIniciales.forEach((libroData) => {
            try {
                const libro = new Libro(libroData);
                libro.id = siguienteId++;
                libros.push(libro);
            } catch (error) {
                console.error(`❌ Error al cargar libro: ${error.message}`);
            }
        });
        console.log(`✅ Cargados ${libros.length} libros iniciales`);
    };

    /**
     * Obtiene todos los libros
     * @returns {Array} Copia de los libros
     */
    const obtenerTodos = () => {
        return [...libros];
    };

    /**
     * Busca un libro por ID
     * @param {number|string} id - ID del libro
     * @returns {Libro|null} El libro encontrado o null
     */
    const obtenerPorId = (id) => {
        if (!Validaciones.isValidId(id, { permitirString: true })) return null;
        const idNumerico = Number(id);
        const libro = libros.find((l) => l.id === idNumerico);
        if (!libro) {
            console.log(`❌ No sé encontro libro con ID ${id}`);
            return null;
        }

        return libro;
    };

    /**
     * Agrega un nuevo libro
     * @param {Object} datosLibro - Datos del libro
     * @returns {Libro|null} El libro creado o null si hay error
     */
    const agregar = (datosLibro) => {
        try {
            // Validar datos
            if (!datosLibro || typeof datosLibro !== "object") {
                throw new Error("Datos de libro inválidos");
            }

            // Verificar ISBN único
            const isbnExistente = libros.some((l) => l.isbn === datosLibro.isbn);
            if (isbnExistente) {
                throw new Error(`Ya existe un libro con ISBN ${datosLibro.isbn}`);
            }

            // Crear libro
            const nuevoLibro = new Libro(datosLibro);
            nuevoLibro.id = siguienteId++;
            libros.push(nuevoLibro);

            console.log(`✅ Libro "${nuevoLibro.titulo}" agregado (ID: ${nuevoLibro.id})`);
            return nuevoLibro;
        } catch (error) {
            console.error(`❌ Error al agregar libro: ${error.message}`);
            return null;
        }
    };

    /**
     * Actuliza un libro existente
     * @param {number|string} id - ID del libro a actualizar
     * @param {Object} datosActualizados - Datos actualizados
     * @returns {Libro|null} El libro actualizado o null
     */
    const actualizar = (id, datosActualizados) => {
        try {
            const libro = obtenerPorId(id);
            if (!libro) return null;

            // Validar y actualizar título
            if(datosActualizados.titulo) {
                if(!Validaciones.isValidString(datosActualizados.titulo, 1, 200)) {
                    throw new Error("Título inválido");
                }

                libro.titulo = datosActualizados.titulo.trim();
            }

            // Validar y actualizar autor
            if(datosActualizados.autor) {
                if(!Validaciones.isValidString(datosActualizados.autor, 1, 1000)) {
                    throw new Error("Autor inválido");
                }
                libro.autor = datosActualizados.autor.trim();
            }

            // Validar y actualizar año
            if(datosActualizados.anioPublicacion) {
                if(!Validaciones.isValidNumber(datosActualizados.anioPublicacion, { min: 1000, max: new Date().getFullYear(), entero: true })
                ) {
                    throw new Error("Año de publicación inválido");
                }

                libro.anioPublicacion = datosActualizados.anioPublicacion;
            }

            libro.disponible = datosActualizados.disponible;

            console.log(`✅ Libro "${libro.titulo}" actualizado`);
            return libro;
        } catch (error) {
            console.error(`❌ Error al actualizar libro: ${error.message}`);
            return null;
        }
    };

    /**
     * Eliminar un libro por ID
     * @param {number|string} id - ID del libro a eliminar
     * @returns {boolean} true si se eliminó, false si no
     */
    const eliminar = (id) => {
        try {
            const libro = obtenerPorId(id);
            if (!libro) return false;

            const index = libros.findIndex(l => l.id === libro.id);
            libros.splice(index, 1);
            console.log(`✅ Libro "${libro.titulo}" eliminado (ID: ${libro.id})`);
            return true;
        } catch (error) {
            console.error(`❌ Error al eliminar libro: ${error.message}`);
            return false;
        }
    };

    /**
     * Buscar libros por título, autor ISBN
     * @param {string} termino - Término de búsqueda
     * @returns {Array} Libros que coinciden con la búsqueda
     */
    const buscar = (termino) => {
        if (!Validaciones.isValidString(termino, 1)) {
            console.log(`❌ Término de búsqueda inválido`);
            return [];
        }

        const terminoLower = termino.toLowerCase();
        const resultados = libros.filter((libro) =>
                libro.titulo.toLowerCase().includes(terminoLower) ||
                libro.autor.toLowerCase().includes(terminoLower) ||
                libro.isbn.toLowerCase().includes(terminoLower)
        );

        console.log(`🔍 Búsqueda "${termino}": ${resultados.length} resultado(s)`);
        return [...resultados];
    };

    /**
     * Obtiene libros disponibles para préstamo
     * @returns {Array} Libros disponibles
     */
    const obtenerDisponibles = () => {
        return libros.filter((libro) => libro.disponible);
    };

    /**
     * Obtiene libros prestados (no disponibles)
     * @returns {Array} Libros prestados
     */
    const obtenerPrestados = () => {
        return libros.filter((libro) => !libro.disponible);
    };

    // API pública
    return {
        cargarLibrosIniciales,
        obtenerTodos,
        obtenerPorId,
        agregar,
        actualizar,
        eliminar,
        buscar,
        obtenerDisponibles,
        obtenerPrestados,
    };
})();
