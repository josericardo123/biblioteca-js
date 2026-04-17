/**
 * Módulo de persistencia con localStorage
 * Almacena y recupera datos del sistema
 */

const STORAGE_KEYS = {
    LIBROS: 'biblioteca_libros',
    USUARIOS: 'biblioteca_usuarios',
    PRESTAMOS: 'biblioteca_prestamos'
}

export const Persistencia = {
    /**
     * Guarda datos en localStorage
     * @param {string} key - Clave de almacenamiento
     * @param {Array} data - Datos a guardar
     */
    guardar(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log(`💾 Datos guardados en localStorage: ${key}`);
            return true;
        } catch(error) {
            console.error(`❌ Error al guardar ${key}:`, error);
            return false;
        }
    },

    /**
     * Recupera datos de localStorage
     * @param {string} key - Clave almacenamiento
     * @returns {Array||null} Datos recuperados o null 
     */
    cargar(key) {
        try {
            const data = localStorage.getItem(key);
            if(!data) return null;
            console.log(`📂 Datos cargados de localStorage: ${key}`);
            return JSON.parse(data);
        } catch(error) {
            console.error(`❌ Error al cargar ${key}`, error);
            return null;
        }
    },

    /**
     * Verificar si hay datos guardados
     * @returns {boolean} True si hay datos
     */
    hayDatosGuardados() {
        return localStorage.getItem(STORAGE_KEYS.LIBROS) !== null;
    },

    /**
     * Limpia todos los datos de localStorage
     */
    limpiar() {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('🗑️ localStorage limpiado');
    },

    // Claves disponibles
    KEYS: STORAGE_KEYS
}