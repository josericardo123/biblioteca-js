/**
 * MODULO DE VALIDACIONES
 * Biblioteca Virtual - Sprint 1
 * 
 * Este módulo contiene funciones reutilizables para validar
 * diferentes tipos de datos en el sistema.
 */

export const Validaciones = {
    /**
     * Valida que un valor sea un string no vacío dentro de un rango de longitud
     * @param {*} valor - El valor a validar
     * @param {number} min - Longitud mínima (por defecto: 1)
     * @param {number} max - Longitud máxima (por defecto: 100)
     * @returns {boolean} - true si es válido, false si no
     */

    isValidString(valor, min, max = 100) {
        // Paso 1: Verificar que el valor existe
        if(valor === undefined || valor === null) {
            console.error('❌ isValidString: El valor no puede ser null o undefined');
            return false;
        }

        // Paso 2: Verificar que es un string 
        if(typeof valor !== 'string') {
            console.error(`❌ isValidString: Se esperaba un string, se recibió ${typeof valor}`);
            return false;
        }

        //paso 3: Eliminar espacios al inicio y final
        const valorLimpio = valor.trim();

        // Paso 4: Verificar que no este vacío despues del trim()
        if(valorLimpio.length === 0) {
            console.error(`❌ isValidString: El string no puede estar vacío`);
            return false;
        }

        // Paso 5: Verificar longitud mínima
        if(valor.length < min) {
            console.error(`❌ isValidString: El string debe tener al menos ${min} caracteres (tiene ${valorLimpio.length})`);
            return false;
        }

        // Paso 6: Validar longitud máxima
        if(valorLimpio.length > max) {
            console.error(`❌ isValidString: El string no puede tener más de ${max} caracteres (tiene ${valorLimpio.length})`);
            return false;
        }

        // Paso 7: Si pasa todas las validaciones
        console.log(`✅ isValidString: "${valorLimpio}" es válido`);
        return true;
    }
};