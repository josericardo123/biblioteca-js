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

    isValidString(valor, min = 1, max = 100) {
        // Paso 1: Verificar que el valor existe
        if (valor === undefined || valor === null) {
            console.error(
                "❌ isValidString: El valor no puede ser null o undefined",
            );
            return false;
        }

        // Paso 2: Verificar que es un string
        if (typeof valor !== "string") {
            console.error(
                `❌ isValidString: Se esperaba un string, se recibió ${typeof valor}`,
            );
            return false;
        }

        //paso 3: Eliminar espacios al inicio y final
        const valorLimpio = valor.trim();

        // Paso 4: Verificar que no este vacío despues del trim()
        if (valorLimpio.length === 0) {
            console.error(`❌ isValidString: El string no puede estar vacío`);
            return false;
        }

        // Paso 5: Verificar longitud mínima
        if (valor.length < min) {
            console.error(
                `❌ isValidString: El string debe tener al menos ${min} caracteres (tiene ${valorLimpio.length})`,
            );
            return false;
        }

        // Paso 6: Validar longitud máxima
        if (valorLimpio.length > max) {
            console.error(
                `❌ isValidString: El string no puede tener más de ${max} caracteres (tiene ${valorLimpio.length})`,
            );
            return false;
        }

        // Paso 7: Si pasa todas las validaciones
        console.log(`✅ isValidString: "${valorLimpio}" es válido`);
        return true;
    },

    /**
     * Valida que un string sea un email valido
     * @param {string} email - Email a validar
     * @returns {boolean} - true si es valida 
     */
    isValidEmail(email) {
        // Paso 1: Verificar que existe y es string (reusamos nuestra función anterior)
        if(!this.isValidString(email, 3, 254)) { // Mínimo 3, máximo 254 (estándar RFC)
            console.error(`❌ isValidEmail: El email debe ser un string válido`);
            return false;
        }
        
        // Paso 2: Verificar que no tenga espacios
        if(email.includes(' ')) {
            console.error(`❌ isValidEmail: El email no puede contener espacios`);
            return false;
        }

        // Paso 3: Verificar que tenga exactamente un @
        const partes = email.split("@");
        if(partes.length !== 2) {
            console.error(`❌ isValidEmail: El email debe tener exactamente un @ (tiene ${partes.length -1})`);
            return false;
        }

        // Paso 4: Separar usuario y dominio
        const [usuario, dominio] = partes;

        // Paso 5: Validar usuario
        if(usuario.length === 0) {
            console.error(`❌ isValidEmail: El usuario no puede estar vacío`);
            return false;
        }

        if(usuario.startsWith('.') || usuario.endsWith('.')) {
            console.error(`❌ isValidEmail: El usuario no puede empezar o terminar con punto`);
            return false;
        }

        // Caracteres permitidos con usuario: letras, números, . _ -
        if(!/^[a-zA-Z0-9._-]+$/.test(usuario)) {
            console.error(`❌ isValidEmail: usuario contiene caracteres no permitidos`);
            return false;
        }

        // Paso 6: Validar dominio
        if(dominio.length === 0) {
            console.error(`❌ isValidEmail: El dominio no puede estar vacío`);
            return false;
        }

        if(dominio.startsWith('.') || dominio.endsWith('.')) {
            console.error(`❌ isValidEmail: El dominio no puede empezar o termniar con punto`);
            return false;
        }

        // Paso 7: Validar extensión (última parte después del último punto)
        const partesDominio = dominio.split('.');
        const extension = partesDominio[partesDominio.length - 1];

        if(partesDominio.length < 2) {
            console.error(`isValidEmail: El dominio debe tener al menos una extensión (ej: .com)`);
            return false;
        }

        if(extension.length < 2 || extension.length > 6) {
            console.error(`❌ isValidEmail: La extensión debe tener entre 2 y 6 caracteres (tiene ${extension.length})`);
            return false;
        }

        if(!/^[a-zA-Z]+$/.test(extension)) {
            console.error(`❌ isValidEmail: La extensión solo puede contener letras`);
            return false;
        }

        // Paso 8: Validar caracteres del dominio (letras, números, puntos, guiones)
        if(!/^[a-zA-Z0-9.-]+$/.test(dominio)) {
            console.error(`❌ isValidEmail: El dominio contiene caracteres no permitidos`);
            return false;
        }

        // Paso 9: si pasa todas las validaciones
        console.log(`✅ isValidEmail: "${email}" es válido`);
        return true;
    },
};
