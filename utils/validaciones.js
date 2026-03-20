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
        if (!this.isValidString(email, 3, 254)) {
            // Mínimo 3, máximo 254 (estándar RFC)
            console.error(
                `❌ isValidEmail: El email debe ser un string válido`,
            );
            return false;
        }

        // Paso 2: Verificar que no tenga espacios
        if (email.includes(" ")) {
            console.error(
                `❌ isValidEmail: El email no puede contener espacios`,
            );
            return false;
        }

        // Paso 3: Verificar que tenga exactamente un @
        const partes = email.split("@");
        if (partes.length !== 2) {
            console.error(
                `❌ isValidEmail: El email debe tener exactamente un @ (tiene ${partes.length - 1})`,
            );
            return false;
        }

        // Paso 4: Separar usuario y dominio
        const [usuario, dominio] = partes;

        // Paso 5: Validar usuario
        if (usuario.length === 0) {
            console.error(`❌ isValidEmail: El usuario no puede estar vacío`);
            return false;
        }

        if (usuario.startsWith(".") || usuario.endsWith(".")) {
            console.error(
                `❌ isValidEmail: El usuario no puede empezar o terminar con punto`,
            );
            return false;
        }

        // Caracteres permitidos con usuario: letras, números, . _ -
        if (!/^[a-zA-Z0-9._-]+$/.test(usuario)) {
            console.error(
                `❌ isValidEmail: usuario contiene caracteres no permitidos`,
            );
            return false;
        }

        // Paso 6: Validar dominio
        if (dominio.length === 0) {
            console.error(`❌ isValidEmail: El dominio no puede estar vacío`);
            return false;
        }

        if (dominio.startsWith(".") || dominio.endsWith(".")) {
            console.error(
                `❌ isValidEmail: El dominio no puede empezar o termniar con punto`,
            );
            return false;
        }

        // Paso 7: Validar extensión (última parte después del último punto)
        const partesDominio = dominio.split(".");
        const extension = partesDominio[partesDominio.length - 1];

        if (partesDominio.length < 2) {
            console.error(
                `isValidEmail: El dominio debe tener al menos una extensión (ej: .com)`,
            );
            return false;
        }

        if (extension.length < 2 || extension.length > 6) {
            console.error(
                `❌ isValidEmail: La extensión debe tener entre 2 y 6 caracteres (tiene ${extension.length})`,
            );
            return false;
        }

        if (!/^[a-zA-Z]+$/.test(extension)) {
            console.error(
                `❌ isValidEmail: La extensión solo puede contener letras`,
            );
            return false;
        }

        // Paso 8: Validar caracteres del dominio (letras, números, puntos, guiones)
        if (!/^[a-zA-Z0-9.-]+$/.test(dominio)) {
            console.error(
                `❌ isValidEmail: El dominio contiene caracteres no permitidos`,
            );
            return false;
        }

        // Paso 9: si pasa todas las validaciones
        console.log(`✅ isValidEmail: "${email}" es válido`);
        return true;
    },

    /**
     * Limpia un ISBN de guiones y espacios
     * @param {string} isbn - ISBN a limpiar
     * @returns {string} ISBN limpio
     * @private
     */
    _limpiarISBN(isbn) {
        return isbn.replace(/[-\s]/g, "");
    },

    /**
     * Valida un ISBN-10
     * @param {string} isbn - ISBN a validar (ya limpio)
     * @returns {boolean} - true si es válido
     * @private
     */
    _validarISBN10(isbn) {
        console.log("🔍 Validando ISBN-10:", isbn);

        // Paso 1: verificar longitud
        if (isbn.length !== 10) {
            console.log("   ❌ Longitud incorrecta:", isbn.length);
            return false;
        }

        // Paso 2: Calcular suma de verificación
        let suma = 0;
        console.log("   Calculando suma:");

        for (let i = 0; i < 9; i++) {
            const digito = parseInt(isbn[i], 10);
            console.log(
                `   Posición ${i + 1}: dígito ${isbn[i]} × ${10 - i} = ${digito * (10 - i)}`,
            );
            if (isNaN(digito)) {
                console.log("   ❌ No es dígito");
                return false;
            }
            suma += digito * (10 - i);
        }

        // Paso 3: Validar último carácter
        const ultimo = isbn[9].toUpperCase();
        let ultimoValor;

        console.log(`   Último carácter: "${ultimo}"`);

        if (ultimo === "X") {
            ultimoValor = 10;
            console.log("   → Valor: 10 (X)");
        } else {
            ultimoValor = parseInt(ultimo, 10);
            console.log(`   → Valor: ${ultimoValor}`);
            if (isNaN(ultimoValor)) {
                console.log("   ❌ Último carácter inválido");
                return false;
            }
        }

        // Paso 4: Verificar suma
        suma += ultimoValor;
        console.log(`   Suma total: ${suma}`);
        console.log(
            `   ${suma} ÷ 11 = ${Math.floor(suma / 11)} residuo ${suma % 11}`,
        );

        return suma % 11 === 0;
    },

    /**
     * Valida un ISBN-13
     * @param {string} isbn - ISBN a validar (ya limpio)
     * @returns {boolean} - true si es válido
     * @private
     */
    _validarISBN13(isbn) {
        console.log("🔍 Validando ISBN-13:", isbn);

        // Paso 1: Verificar longitud
        if (isbn.length !== 13) {
            console.log("   ❌ Longitud incorrecta:", isbn.length);
            return false;
        }

        // Paso 2: Verificar prefijo
        const prefijo = isbn.substring(0, 3);
        console.log("   Prefijo:", prefijo);

        if (prefijo !== "978" && prefijo !== "979") {
            console.log("   ❌ Prefijo inválido");
            return false;
        }

        // Paso 3: Calcular suma
        let suma = 0;
        console.log("   Calculando suma:");

        for (let i = 0; i < 12; i++) {
            const digito = parseInt(isbn[i], 10);
            const multiplicador = (i + 1) % 2 === 0 ? 3 : 1;
            const producto = digito * multiplicador;

            console.log(
                `   Posición ${i + 1}: dígito ${isbn[i]} × ${multiplicador} = ${producto}`,
            );

            if (isNaN(digito)) {
                console.log("   ❌ No es dígito");
                return false;
            }

            suma += producto;
        }

        // Paso 4: Calcular dígito de control
        const digitoControl = parseInt(isbn[12], 10);
        console.log(`   Dígito control proporcionado: ${digitoControl}`);

        if (isNaN(digitoControl)) {
            console.log("   ❌ Dígito control inválido");
            return false;
        }

        const resto = suma % 10;
        const digitoEsperado = resto === 0 ? 0 : 10 - resto;

        console.log(`   Suma total: ${suma}`);
        console.log(`   Resto: ${resto}`);
        console.log(`   Dígito esperado: ${digitoEsperado}`);
        console.log(
            `   ${digitoControl} === ${digitoEsperado}? ${digitoControl === digitoEsperado ? "✅" : "❌"}`,
        );

        return digitoControl === digitoEsperado;
    },

    /**
     * Valida que un string sea un ISBN válido (10 0 13 dígitos)
     * @param {string} isbn - ISBN a validar
     * @returns {boolean} - true si es válido
     */
    isValidISBN(isbn) {
        // Paso 1: Verificar que existe  y es string
        if (!this.isValidString(isbn, 1)) {
            console.error(`❌ isValidISBN: El ISBN debe ser un string válido`);
            return false;
        }

        // Paso 2: Limpiar guiones y espacios
        const isbnLimpio = this._limpiarISBN(isbn);

        // Paso 3: Verificar que después de limpiar no esté vacío
        if (isbnLimpio.length === 0) {
            console.error(`❌ isValidISBN: El ISBN no puede estar vacío`);
            return false;
        }

        // Paso 4: Validar según longitud
        let esValido = false;
        if (isbnLimpio.length === 10) {
            esValido = this._validarISBN10(isbnLimpio);
        } else if (isbnLimpio.length === 13) {
            esValido = this._validarISBN13(isbnLimpio);
        } else {
            console.error(
                `❌ isValidISBN: debe tener 10 o 13 dígitos (tiene ${isbnLimpio.length})`,
            );
            return false;
        }

        // Paso 5: Mostrar resultado
        if (esValido) {
            console.log(`✅ isValidISBN: "${isbn}" es válido`);
        } else {
            console.error(
                `❌ isValidISBN: "${isbn}" no es válido (dígito de control incorrecto)`,
            );
        }

        return esValido;
    },

    /**
     * Valida que un string sea una fecha válida en formato YYYY-MM-DD
     * @param {string} fechaStr - Fecha a validar (formato YYYY-MM-DD)
     * @param {boolean} permitirPasado - Si true, permite fechas pasadas (por defecto false)
     *  @returns {boolean} - true si es válida
     */
    isValidDate(fechaStr, permitirPasado = false) {
        // Paso 1: Verficar que existe y es string
        if (!this.isValidString(fechaStr, 10, 10)) {
            console.error(
                `❌ isValidDate: La fecha debe ser un string de 10 caracteres`,
            );
            return false;
        }

        // Paso 2: Vefiricar formato con regex (YYYY-MM-DD)
        const formatoRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!formatoRegex.test(fechaStr)) {
            console.error(
                `❌ isValidDate: Formato inválido, Use YYYY-MM-DD (ej: 2024-12-31)`,
            );
            return false;
        }

        // Paso 3: Crear objeto Date
        const [anio, mes, dia] = fechaStr.split("-").map(Number);
        const fecha = new Date(Date.UTC(anio, mes - 1, dia));

        // Paso 4: Verificar que la fecha sea válida
        if (isNaN(fecha.getTime())) {
            console.error(
                `❌ isValidDate: La fecha no existe (ej: 2024-02-30 no es válido)`,
            );
            return false;
        }

        // Paso 5: Verificar que los componentes coinciden (para detectar desbordamiento)
        if (
            fecha.getUTCFullYear() !== anio ||
            fecha.getUTCMonth() + 1 !== mes ||
            fecha.getUTCDate() !== dia
        ) {
            console.error(
                `❌ isValidDate: La fecha no es coherente (ej: 2024-02-29 solo en bisiesto)`,
            );
            return false;
        }

        // Paso 6: Verificar rango razonable (1900 - 2100)
        if (anio < 1900 || anio > 2100) {
            console.error(
                `❌ isValidDate: El año debe estar entre 1900 y 2100`,
            );
            return false;
        }

        // Paso 7: Verificar que no sea fecha pasada (si no se permite)
        if (!permitirPasado) {
            const hoy = new Date();
            const hoyUTC = Date.UTC(
                hoy.getFullYear(),
                hoy.getMonth(),
                hoy.getDate(),
            );

            if (fecha < hoyUTC) {
                console.error(
                    `❌ isValidDate: La fecha no puede ser en el pasado`,
                );
                return false;
            }
        }

        // Paso 8: Si pasa todas las validaciones
        console.log(`✅ isValidDate: "${fechaStr}" es válido`);
        return true;
    },

    /**
     * Valida que un valor sea un número válido dentro de un rango
     * @param {*} valor - El valor a validar
     * @param {Object} opciones - Opciones de validación
     * @param {number} opciones.min - Valor mínimo permitido (por defecto: -Infinity)
     * @param {number} opciones.max - Valor máximo permitido (por defecto: -Infinity)
     * @param {boolean} opciones.entero - Si true, solo acepta números enteros (por defecto: -false)
     * @param {boolean} opciones.positivo - Si true, solo acepta números positivos (por defecto: -false)
     * @returns {boolean} - true si es válido
     */
    isValidNumber(valor, opciones = {}) {
        const {
            min = -Infinity,
            max = Infinity,
            entero = false,
            positivo = false,
        } = opciones;

        // Paso 1: Verificar que existe
        if (valor === undefined || valor === null) {
            console.error(
                `❌ isValidNumber: El valor no puede ser null o undefined`,
            );
            return false;
        }

        // Paso 2: Verificar que es un nùmero
        if (typeof valor !== "number") {
            console.error(
                `❌ isValidNumber: Se esperaba un número, se recibió ${typeof valor}`,
            );
            return false;
        }

        // Paso 3: Verificar que no sea NaN o Infinity
        if (isNaN(valor) || !isFinite(valor)) {
            console.error(
                `❌ isValidNumber: El valor no es un número válido (NaN o Infinity)`,
            );
            return false;
        }

        // Paso 4: Verificar que sea entero si se requiere
        if (entero && !Number.isInteger(valor)) {
            console.error(
                `❌ isValidNumber: Se esperaba un número entero, se recibió ${valor}`,
            );
            return false;
        }

        // Paso 5: Verificar que sea positivo si requiere
        if (positivo && valor <= 0) {
            console.error(
                `❌ isValidNumber: Se esperaba un número positivo, se recibió ${valor}`,
            );
            return false;
        }

        // Paso 6: Verificar rango mínimo
        if (valor < min) {
            console.error(
                `❌ isValidNumber: El valor debe ser mayor o igual a ${min} (recibido ${valor})`,
            );
            return false;
        }

        // Paso 7: Verificar rango máximo
        if (valor > max) {
            console.error(
                `❌ isValidNumber: El valor debe ser menor o igual a ${max} (recibido ${valor})`,
            );
            return false;
        }

        // Paso 8: Si pasa todas las validaciones
        console.log(`✅ isValidNumber: ${valor} es válido`);
        return true;
    },

    /**
     * Valida que un valor sea un array válido
     * @param {*} valor - El valor a validar
     * @param {Object} opciones - Opciones de validación
     * @param {boolean} opciones.noVacio - Si true, el array no puede estar vacío (por defecto: false)
     * @param {string} opciones.tipoElemento - Tipo esperado para cada elemento ('string', 'number', 'etc.')
     * @param {Function} opciones.validadorElemento - Función de validación personalizada para cada elemento
     * @returns {boolean} - true si es válido
     */

    isValidArray(valor, opciones = {}) {
        // Valores por defecto
        const {
            noVacio = false,
            tipoElemento = null,
            validadorElemento = null
        } = opciones;

        // Paso 1: Verificar que existe
        if(valor === undefined || valor === null) {
            console.error(`❌ isValidArray: El valor no puede ser null o undefined`);
            return false;
        }

        // Paso 2: Verificar que es un Array
        if(!Array.isArray(valor)) {
            console.error(`❌ isValidArray: Se esperaba un array, se recibió ${typeof valor}`);
            return false;
        }

        // Paso 3: Verificar que no este vacío si se requiere
        if(noVacio && valor.length === 0) {
            console.error(`❌ isValidArray: El array no puede estar vacío`);
            return false;
        }

        // Paso 4: Validar elementos si se específico tipo
        if(tipoElemento) {
            for(let i = 0; i < valor.length; i++) {
                const elemento = valor[i];
                const tipoElementoReal = typeof elemento;
                if(tipoElementoReal !== tipoElemento) {
                    console.error(`❌ isValidArray: Elemento en posición ${i} debe ser ${tipoElemento}, es ${tipoElementoReal}`);
                    return false;
                }
            }
        }

        // Paso 5: Validar elementos con validador personalizado
        if(validadorElemento && typeof validadorElemento === 'function') {
            for(let i = 0; i < valor.length; i++) {
                if(!validadorElemento(valor[i])) {
                    console.error(`❌ isValidArray: Elemento en posición ${i} no pasa la validación personalizada`);
                    return false;
                }
            }
        }

        // Paso 6: Si pasa todas las validaciones
        console.log(`✅ isValidArray: Array de ${valor.length} elemento(s) es válido`);
        return true;
    },

    /**
     * Valida que un valor sea un ID válido
     * @param {*} valor - El valor a validar
     * @param {Object} opciones - Opciones de validación
     * @param {boolean} opciones.permitirString - Si true, permiste IDs en formato string (por default false)
     * @param {number} opciones.min - Valor mínimo permitido (por defecto : 1)
     * @param {number} opciones.max - Valor máximo permitido (por defecto 999999)
     * @returns {boolean} - true si es válido
     */

    isValidId(valor, opciones = {}) {
        const {
            permitirString = false,
            min = 1,
            max = 999999
        } = opciones;

        // Paso 1: Verificar que existe
        if(valor === undefined || valor === null) {
            console.error(`❌ isValidId: El ID no puede ser null o undefined`);
            return false;
        }

        // Paso 2: Convertir a número si es string y está permitido
        let idNumerico = valor;
        let esString = false;

        if(typeof valor === 'string') {
            if(!permitirString) {
                console.error(`❌ isValidId: Se esperaba un número, se recibió string: ${valor}`);
                return false;
            }

            // Verificar que el string solo contenga dígitos
            if(!/^\d+$/.test(valor)) {
                console.error(`❌ isValidId: El string debe contener solo dígitos (recibio: "${valor}")`);
                return false;
            }

            idNumerico = Number(valor);
            esString = true;
        }

        // Paso 3: Verificar que sea un número
        if(typeof idNumerico !== 'number') {
            console.error(`❌ isValidId: Se esperaba un número, se recibio ${typeof valor}`);
            return false;
        }

        // Paso 4: Verificar que no sea NaN o Infinity
        if(isNaN(idNumerico) || !isFinite(idNumerico)) {
            console.error(`❌ isValidId: El ID no es un número válido`);
            return false;
        }

        // Paso 5: Verificar que sea entero
        if(!Number.isInteger(idNumerico)) {
            console.error(`❌ isValidId: El ID debe ser un número entero (recibido: ${idNumerico})`);
            return false;
        }

        // Paso 6: Verificar que sea positivo
        if(idNumerico < min) {
            console.log(`❌ isValidId: El ID debe ser mayor o igual a ${min} (recibido: ${idNumerico})`);
            return false;
        }

        // Paso 7: Verificar rango máximo
        if(idNumerico > max) {
            console.error(`❌ idValidId: El ID debe ser menor o igual a ${max} (recibido: ${idNumerico})`);
            return false;
        }

        // Paso 8: Si pasa todas las validación
        const tipo = esString ? `string "${valor}"` : `número ${idNumerico}`;
        console.log(`✅ isValidId: ${tipo} es válido`);
        return true;
    }
};
