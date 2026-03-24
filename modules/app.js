// modules/app.js
import { Validaciones } from "../utils/validaciones.js";
import { Libro } from "../libros.js";
import { librosIniciales } from "../data/inicial.js";

console.log(
    "%C📚 SPRINT 2 - MODULO DE LIBROS",
    "color: red; font-size: 18px; font-weight: bold",
);

// Prueba 1: Crear libro válido
console.log("\n📖 Prueba 1: Crear libro válido");
try {
    const libro1 = new Libro({
        titulo: "El Principito",
        autor: "Antonie de Saint-Exupéry",
        isbn: "978-84-376-0494-7",
        anioPublicacion: 1943,
    });
    console.log("✅ Libro creado: ", libro1.titulo);
    console.log(libro1.toJSON);
} catch (error) {
    console.error("❌ Error: ", error.message);
}

// Prueba 2: Crear libro con título inválido
console.log("\n📖 Prueba 2: Crear libro con título inválido");
try {
    const libro2 = new Libro({
        titulo: "",
        autor: "Antonie de Saint-Exupéry",
        isbn: "978-84-376-0494-7",
        anioPublicacion: 1943,
    });
    console.log("✅ Libro creado");
} catch (error) {
    console.error("❌ Error: ", error.message);
}

// Prueba 3: Crear libro con ISBN inválido
console.log("\n📖 Prueba 3: Crear libro con ISBN inválido");
try {
    const libro3 = new Libro({
        titulo: "Libro Test",
        autor: "Autor Test",
        isbn: "1234567890",
        anioPublicacion: 2020,
    });
    console.log("✅ Libro creado");
} catch (error) {
    console.error("❌ Error:", error.message);
}

// Prueba 4: Probar método prestar()
console.log("\n📖 Prueba 4: Probar método prestar()");
try {
    const libro4 = new Libro({
        titulo: "Libro para préstamo",
        autor: "Autor Test",
        isbn: "978-84-376-0494-7",
        anioPublicacion: 2020,
    });
    console.log("Libro disponible", libro4.disponible);
    libro4.prestar();
    console.log("Después de prestar:", libro4.disponible);
    libro4.devolver();
    console.log("Después de devolver:", libro4.disponible);
} catch (error) {
    console.error("❌ Error: ", error.message);
}

/** ---------------------- SPRINT 2 */

//  console.log('%c🧪 PRUEBAS DE VALIDACIONES', 'color: purple; font-size: 16px; font-weight: bold;');

// console.log('📝 Probando isValidString:');
// console.log('----------------------------------------');

// Caso 1: String válido
// console.log('Caso 1: "HOLA MUNDO"');
// const resultado1  = Validaciones.isValidString('Hola Mundo');
// console.log('Resultado: ', resultado1 ? '✅ VALIDO' : '❌ INVALIDO');
// console.log('----------------------------------------');

// Caso 2: String vacio
// console.log('Caso 2: ""');
// const resultado2 = Validaciones.isValidString('');
// console.log('Resultado: ', resultado2 ? '✅ VALIDO' : '❌ INVALIDO');
// console.log('----------------------------------------');

// Caso 3: String con solo espacios
// console.log('Caso 3: "   "');
// const resultado3 = Validaciones.isValidString('   ');
// console.log('Resultado: ', resultado3 ? '✅ VALIDO' : '❌ INVALIDO');
// console.log('----------------------------------------');

// Caso 4: Número en lugar de string
// console.log('Caso 4: 123');
// const resultado4 = Validaciones.isValidString(123);
// console.log('Resultado: ', resultado4 ? '✅ VALIDO' : '❌ INVALIDO');
// console.log('----------------------------------------');

// Caso 5: null
// console.log('Caso 5: null');
// const resultado5 = Validaciones.isValidString(null);
// console.log('Resultado: ', resultado5 ? '✅ VALIDO' : '❌ INVALIDO');
// console.log('----------------------------------------');

// Caso 6: String muy largo (con limite personalizado)
// console.log('Caso 6: "a".repeat(200) con max=10');
// const resultado6 = Validaciones.isValidString("a".repeat(200), 1, 10);
// console.log('Resultado: ', resultado6 ? '✅ VALIDO' : '❌ INVALIDO');
// console.log('----------------------------------------');

// Caso 7: String válido con limites personalizados
// console.log('Caso 7: "JS" con min=2 max=5');
// const resultado7 = Validaciones.isValidString("JS", 2, 5);
// console.log('Resultado: ', resultado7 ? '✅ VALIDO' : '❌ INVALIDO');
// console.log('----------------------------------------');

// console.log('%c📧 Probando isValidEmail:', 'color: blue; font-size: 14px; font-weight: bold;');
// console.log('----------------------------------------');
// Caso 1: Email válido simple
// console.log('Caso 1: "usuario@dominio.com"');
// const email = Validaciones.isValidEmail("usuario@dominio.com");
// console.log('Resultado:', email ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 2: Email com puntos y guiones en usuario
// console.log('Caso 2: "jose.rodriguez-23@empresa.com"');
// const email2 = Validaciones.isValidEmail("jose.rodriguez-23@empresa.com");
// console.log('Resultado:', email2 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 3: Email sin @
// console.log('Caso 3: "usuariodominio.com"');
// const email3 = Validaciones.isValidEmail('usuariodominio.com');
// console.log('Resultado:', email3 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 4: Email con dos @
// console.log('Caso 4: "usuario@domi@nio.com"');
// const email4 = Validaciones.isValidEmail('usuario@domi@nio.com');
// console.log('Resultado:', email4 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 5: Email con espacios
// console.log('Caso 5: "usuario @dominio.com"');
// const email5 = Validaciones.isValidEmail('usuario @dominio.com');
// console.log('Resultado:', email5 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 6: Email sin extensión
// console.log('Caso 6: "usuario@dominio"');
// const email6 = Validaciones.isValidEmail('usuario@dominio');
// console.log('Resultado:', email6 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 7: Email con extensión muy corta
// console.log('Caso 7: "usuario@dominio.c"');
// const email7 = Validaciones.isValidEmail('usuario@dominio.c');
// console.log('Resultado:', email7 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 8: Email con extensión muy larga
// console.log('Caso 8: "usuario@dominio.comercial"');
// const email8 = Validaciones.isValidEmail('usuario@dominio.comercial');
// console.log('Resultado:', email8 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 9: Email con caracteres especiales no permitidos
// console.log('Caso 9: "usuario#$$@dominio.com"');
// const email9 = Validaciones.isValidEmail('usuario#$$@dominio.com');
// console.log('Resultado:', email9 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 10: Email con dominio que empieza con punto
// console.log('Caso 10: "usuario@.dominio.com"');
// const email10 = Validaciones.isValidEmail('usuario@.dominio.com');
// console.log('Resultado:', email10 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 11: Email con subdominio
// console.log('Caso 11: "usuario@sub.dominio.com"');
// const email11 = Validaciones.isValidEmail('usuario@sub.dominio.com');
// console.log('Resultado:', email11 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 12: Email con extensión de dos partes (ej: .co.uk)
// console.log('Caso 12: "usuario@dominio.co.uk"');
// const email12 = Validaciones.isValidEmail('usuario@dominio.co.uk');
// console.log('Resultado:', email12 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Caso 13: Email con guiones en dominio
// console.log('Caso 13: "usuario@mi-dominio.com"');
// const email13 = Validaciones.isValidEmail('usuario@mi-dominio.com');
// console.log('Resultado:', email13 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// modules/app.js - Actualizar la sección de ISBN

// console.log('%c📚 Probando isValidISBN:', 'color: green; font-size: 14px; font-weight: bold;');
// console.log('----------------------------------------');

// ISBN-10 válidos
// console.log('📖 ISBN-10 VÁLIDOS:');
// console.log('Caso 1: "84-376-0494-X" (El Quijote - con X)');
// const isbn1 = Validaciones.isValidISBN('84-376-0494-X');
// console.log('Resultado:', isbn1 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 2: "843760494X" (sin guiones)');
// const isbn2 = Validaciones.isValidISBN('843760494X');
// console.log('Resultado:', isbn2 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// ISBN-13 válidos
// console.log('📖 ISBN-13 VÁLIDOS:');
// console.log('Caso 3: "978-84-376-0494-7" (El Quijote edición moderna)');
// const isbn3 = Validaciones.isValidISBN('978-84-376-0494-7');
// console.log('Resultado:', isbn3 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 4: "9788437604947" (sin guiones)');
// const isbn4 = Validaciones.isValidISBN('9788437604947');
// console.log('Resultado:', isbn4 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// ISBN inválidos (para confirmar que detecta errores)
// console.log('❌ ISBN INVÁLIDOS:');
// console.log('Caso 5: "84-376-0494-4" (dígito incorrecto)');
// const isbn5 = Validaciones.isValidISBN('84-376-0494-4');
// console.log('Resultado:', isbn5 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// Obtener fechas dinámicas basadas en el año actual 2026
// const añoActual = 2026; // Fijo para claridad
// const añoFuturo = 2027;
// const añoPasado = 2025;
// const añoBisiesto = 2024; // Último año bisiesto
// const añoBisiestoFuturo = 2028; // Próximo año bisiesto

// console.log('%c📅 Probando isValidDate:', 'color: orange; font-size: 14px; font-weight: bold;');
// console.log(`📆 Año actual: ${añoActual}`);
// console.log('----------------------------------------');

// // =============================================
// // FECHAS VÁLIDAS (TODAS DEBERÍAN DAR ✅)
// // =============================================
// console.log('📅 FECHAS VÁLIDAS:');

// // Caso 1: Fecha futura (2027)
// console.log(`Caso 1: "${añoFuturo}-12-31" (año futuro)`);
// const fecha1 = Validaciones.isValidDate(`${añoFuturo}-12-31`);
// console.log('Resultado:', fecha1 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 2: Febrero no bisiesto en año futuro
// console.log(`Caso 2: "${añoFuturo}-02-28" (febrero no bisiesto)`);
// const fecha2 = Validaciones.isValidDate(`${añoFuturo}-02-28`);
// console.log('Resultado:', fecha2 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 3: Año bisiesto futuro (2028)
// console.log(`Caso 3: "${añoBisiestoFuturo}-02-29" (año bisiesto futuro)`);
// const fecha3 = Validaciones.isValidDate(`${añoBisiestoFuturo}-02-29`);
// console.log('Resultado:', fecha3 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 4: Fecha actual (hoy)
// const hoy = new Date();
// const añoHoy = hoy.getFullYear();
// const mesHoy = String(hoy.getMonth() + 1).padStart(2, '0');
// const diaHoy = String(hoy.getDate()).padStart(2, '0');
// console.log(`Caso 4: "${añoHoy}-${mesHoy}-${diaHoy}" (fecha actual - hoy)`);
// const fecha4 = Validaciones.isValidDate(`${añoHoy}-${mesHoy}-${diaHoy}`);
// console.log('Resultado:', fecha4 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 5: Fecha con permitirPasado=true (aunque sea pasada)
// console.log(`Caso 5: "${añoPasado}-01-01" con permitirPasado=true`);
// const fecha5 = Validaciones.isValidDate(`${añoPasado}-01-01`, true);
// console.log('Resultado:', fecha5 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // =============================================
// // FECHAS INVÁLIDAS (TODAS DEBERÍAN DAR ❌)
// // =============================================
// console.log('❌ FECHAS INVÁLIDAS:');

// // Caso 6: Formato incorrecto (DD-MM-YYYY)
// console.log('Caso 6: "31-12-2025" (formato incorrecto)');
// const fecha6 = Validaciones.isValidDate('31-12-2025');
// console.log('Resultado:', fecha6 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 7: Formato incorrecto (YYYY/MM/DD)
// console.log('Caso 7: "2025/12/31" (separador incorrecto)');
// const fecha7 = Validaciones.isValidDate('2025/12/31');
// console.log('Resultado:', fecha7 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 8: Mes 13
// console.log(`Caso 8: "${añoFuturo}-13-01" (mes 13)`);
// const fecha8 = Validaciones.isValidDate(`${añoFuturo}-13-01`);
// console.log('Resultado:', fecha8 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 9: 30 de febrero
// console.log(`Caso 9: "${añoFuturo}-02-30" (30 de febrero)`);
// const fecha9 = Validaciones.isValidDate(`${añoFuturo}-02-30`);
// console.log('Resultado:', fecha9 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 10: 29 de febrero en año no bisiesto (2025)
// console.log(`Caso 10: "${añoPasado}-02-29" (año no bisiesto)`);
// const fecha10 = Validaciones.isValidDate(`${añoPasado}-02-29`);
// console.log('Resultado:', fecha10 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 11: Año < 1900
// console.log('Caso 11: "1800-01-01" (año < 1900)');
// const fecha11 = Validaciones.isValidDate('1800-01-01');
// console.log('Resultado:', fecha11 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 12: Año > 2100
// console.log('Caso 12: "2101-01-01" (año > 2100)');
// const fecha12 = Validaciones.isValidDate('2101-01-01');
// console.log('Resultado:', fecha12 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 13: Fecha pasada sin permitir
// console.log(`Caso 13: "${añoPasado}-01-01" (fecha pasada)`);
// const fecha13 = Validaciones.isValidDate(`${añoPasado}-01-01`);
// console.log('Resultado:', fecha13 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // Caso 14: 29 de febrero en año bisiesto pasado (2024 - ya pasó)
// console.log(`Caso 14: "2024-02-29" (año bisiesto pasado)`);
// const fecha14 = Validaciones.isValidDate('2024-02-29');
// console.log('Resultado:', fecha14 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('%c🔢 Probando isValidNumber:', 'color: blue; font-size: 14px; font-weight: bold;');
// console.log('----------------------------------------');

// // =============================================
// // NÚMEROS VÁLIDOS (SIN OPCIONES)
// // =============================================
// console.log('🔢 NÚMEROS VÁLIDOS (sin opciones):');
// console.log('Caso 1: 42');
// const num1 = Validaciones.isValidNumber(42);
// console.log('Resultado:', num1 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 2: -10');
// const num2 = Validaciones.isValidNumber(-10);
// console.log('Resultado:', num2 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 3: 3.1416');
// const num3 = Validaciones.isValidNumber(3.1416);
// console.log('Resultado:', num3 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 4: 0');
// const num4 = Validaciones.isValidNumber(0);
// console.log('Resultado:', num4 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // =============================================
// // NÚMEROS VÁLIDOS (CON OPCIONES)
// // =============================================
// console.log('🔢 NÚMEROS VÁLIDOS (con opciones):');

// console.log('Caso 5: 25 con { min: 0, max: 100 }');
// const num5 = Validaciones.isValidNumber(25, { min: 0, max: 100 });
// console.log('Resultado:', num5 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 6: 7 con { entero: true }');
// const num6 = Validaciones.isValidNumber(7, { entero: true });
// console.log('Resultado:', num6 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 7: 15 con { positivo: true }');
// const num7 = Validaciones.isValidNumber(15, { positivo: true });
// console.log('Resultado:', num7 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 8: 50 con { min: 10, max: 100, entero: true, positivo: true }');
// const num8 = Validaciones.isValidNumber(50, { min: 10, max: 100, entero: true, positivo: true });
// console.log('Resultado:', num8 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // =============================================
// // NÚMEROS INVÁLIDOS
// // =============================================
// console.log('❌ NÚMEROS INVÁLIDOS:');

// console.log('Caso 9: "42" (string)');
// const num9 = Validaciones.isValidNumber("42");
// console.log('Resultado:', num9 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 10: null');
// const num10 = Validaciones.isValidNumber(null);
// console.log('Resultado:', num10 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 11: NaN');
// const num11 = Validaciones.isValidNumber(NaN);
// console.log('Resultado:', num11 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 12: Infinity');
// const num12 = Validaciones.isValidNumber(Infinity);
// console.log('Resultado:', num12 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 13: 200 con { max: 100 }');
// const num13 = Validaciones.isValidNumber(200, { max: 100 });
// console.log('Resultado:', num13 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 14: -5 con { min: 0 }');
// const num14 = Validaciones.isValidNumber(-5, { min: 0 });
// console.log('Resultado:', num14 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 15: 3.14 con { entero: true }');
// const num15 = Validaciones.isValidNumber(3.14, { entero: true });
// console.log('Resultado:', num15 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 16: -10 con { positivo: true }');
// const num16 = Validaciones.isValidNumber(-10, { positivo: true });
// console.log('Resultado:', num16 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 17: 0 con { positivo: true }');
// const num17 = Validaciones.isValidNumber(0, { positivo: true });
// console.log('Resultado:', num17 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('%c📦 Probando isValidArray:', 'color: purple; font-size: 14px; font-weight: bold;');
// console.log('----------------------------------------');

// // =============================================
// // ARRAYS VÁLIDOS (SIN OPCIONES)
// // =============================================
// console.log('📦 ARRAYS VÁLIDOS (sin opciones):');

// console.log('Caso 1: [] (array vacío)');
// const arr1 = Validaciones.isValidArray([]);
// console.log('Resultado:', arr1 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 2: [1, 2, 3]');
// const arr2 = Validaciones.isValidArray([1, 2, 3]);
// console.log('Resultado:', arr2 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 3: ["a", "b", "c"]');
// const arr3 = Validaciones.isValidArray(["a", "b", "c"]);
// console.log('Resultado:', arr3 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // =============================================
// // ARRAYS VÁLIDOS (CON OPCIONES)
// // =============================================
// console.log('📦 ARRAYS VÁLIDOS (con opciones):');

// console.log('Caso 4: [1, 2, 3] con { noVacio: true }');
// const arr4 = Validaciones.isValidArray([1, 2, 3], { noVacio: true });
// console.log('Resultado:', arr4 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 5: ["libro1", "libro2"] con { tipoElemento: "string" }');
// const arr5 = Validaciones.isValidArray(["libro1", "libro2"], { tipoElemento: "string" });
// console.log('Resultado:', arr5 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 6: [1, 2, 3] con { tipoElemento: "number" }');
// const arr6 = Validaciones.isValidArray([1, 2, 3], { tipoElemento: "number" });
// console.log('Resultado:', arr6 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 7: [10, 20, 30] con validador personalizado (números > 5)');
// const validadorMayor5 = (num) => num > 5;
// const arr7 = Validaciones.isValidArray([10, 20, 30], { validadorElemento: validadorMayor5 });
// console.log('Resultado:', arr7 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 8: ["a", "b", "c"] con { noVacio: true, tipoElemento: "string" }');
// const arr8 = Validaciones.isValidArray(["a", "b", "c"], { noVacio: true, tipoElemento: "string" });
// console.log('Resultado:', arr8 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // =============================================
// // ARRAYS INVÁLIDOS
// // =============================================
// console.log('❌ ARRAYS INVÁLIDOS:');

// console.log('Caso 9: "no es array" (string)');
// const arr9 = Validaciones.isValidArray("no es array");
// console.log('Resultado:', arr9 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 10: null');
// const arr10 = Validaciones.isValidArray(null);
// console.log('Resultado:', arr10 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 11: undefined');
// const arr11 = Validaciones.isValidArray(undefined);
// console.log('Resultado:', arr11 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 12: {} (objeto)');
// const arr12 = Validaciones.isValidArray({});
// console.log('Resultado:', arr12 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 13: [] con { noVacio: true }');
// const arr13 = Validaciones.isValidArray([], { noVacio: true });
// console.log('Resultado:', arr13 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 14: ["a", "b", 1] con { tipoElemento: "string" }');
// const arr14 = Validaciones.isValidArray(["a", "b", 1], { tipoElemento: "string" });
// console.log('Resultado:', arr14 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 15: [1, 2, 3] con validador personalizado (números pares)');
// const validadorPar = (num) => num % 2 === 0;
// const arr15 = Validaciones.isValidArray([1, 2, 3], { validadorElemento: validadorPar });
// console.log('Resultado:', arr15 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// modules/app.js - Añadir después de las pruebas de array

// console.log('%c🆔 Probando isValidId:', 'color: teal; font-size: 14px; font-weight: bold;');
// console.log('----------------------------------------');

// // =============================================
// // IDs VÁLIDOS (SIN OPCIONES)
// // =============================================
// console.log('🆔 IDs VÁLIDOS (sin opciones):');

// console.log('Caso 1: 1');
// const id1 = Validaciones.isValidId(1);
// console.log('Resultado:', id1 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 2: 100');
// const id2 = Validaciones.isValidId(100);
// console.log('Resultado:', id2 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 3: 999999');
// const id3 = Validaciones.isValidId(999999);
// console.log('Resultado:', id3 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // =============================================
// // IDs VÁLIDOS (CON OPCIONES)
// // =============================================
// console.log('🆔 IDs VÁLIDOS (con opciones):');

// console.log('Caso 4: "123" con { permitirString: true }');
// const id4 = Validaciones.isValidId("123", { permitirString: true });
// console.log('Resultado:', id4 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 5: 50 con { min: 10, max: 100 }');
// const id5 = Validaciones.isValidId(50, { min: 10, max: 100 });
// console.log('Resultado:', id5 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 6: 10 con { min: 10, max: 100 }');
// const id6 = Validaciones.isValidId(10, { min: 10, max: 100 });
// console.log('Resultado:', id6 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 7: 100 con { min: 10, max: 100 }');
// const id7 = Validaciones.isValidId(100, { min: 10, max: 100 });
// console.log('Resultado:', id7 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 8: "1" con { permitirString: true, min: 1, max: 100 }');
// const id8 = Validaciones.isValidId("1", { permitirString: true, min: 1, max: 100 });
// console.log('Resultado:', id8 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// // =============================================
// // IDs INVÁLIDOS
// // =============================================
// console.log('❌ IDs INVÁLIDOS:');

// console.log('Caso 9: 0 (debe ser >= 1)');
// const id9 = Validaciones.isValidId(0);
// console.log('Resultado:', id9 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 10: -5 (negativo)');
// const id10 = Validaciones.isValidId(-5);
// console.log('Resultado:', id10 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 11: 1.5 (decimal)');
// const id11 = Validaciones.isValidId(1.5);
// console.log('Resultado:', id11 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 12: 1000000 (excede max por defecto)');
// const id12 = Validaciones.isValidId(1000000);
// console.log('Resultado:', id12 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 13: null');
// const id13 = Validaciones.isValidId(null);
// console.log('Resultado:', id13 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 14: undefined');
// const id14 = Validaciones.isValidId(undefined);
// console.log('Resultado:', id14 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 15: "abc" (string sin permitir)');
// const id15 = Validaciones.isValidId("abc");
// console.log('Resultado:', id15 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 16: "abc" con { permitirString: true } (contiene letras)');
// const id16 = Validaciones.isValidId("abc", { permitirString: true });
// console.log('Resultado:', id16 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 17: "12a3" con { permitirString: true } (contiene letras)');
// const id17 = Validaciones.isValidId("12a3", { permitirString: true });
// console.log('Resultado:', id17 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 18: 150 con { max: 100 }');
// const id18 = Validaciones.isValidId(150, { max: 100 });
// console.log('Resultado:', id18 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');

// console.log('Caso 19: 5 con { min: 10, max: 100 }');
// const id19 = Validaciones.isValidId(5, { min: 10, max: 100 });
// console.log('Resultado:', id19 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
// console.log('----------------------------------------');
