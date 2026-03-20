// modules/app.js
 import { Validaciones } from '../utils/validaciones.js';

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

// modules/app.js - Añadir después de las pruebas de ISBN

// Obtener fechas dinámicas basadas en el año actual
const añoActual = new Date().getFullYear(); // 2026
const añoFuturo = añoActual + 1; // 2027
const añoPasado = añoActual - 1; // 2025
const añoBisiesto = 2024; // Último año bisiesto antes de 2026

console.log('%c📅 Probando isValidDate:', 'color: orange; font-size: 14px; font-weight: bold;');
console.log(`📆 Año actual: ${añoActual}`);
console.log('----------------------------------------');

// Fechas válidas
console.log('📅 FECHAS VÁLIDAS:');
console.log(`Caso 1: "2027-12-31" (año futuro)`);
const fecha1 = Validaciones.isValidDate(`2027-12-31`);
console.log('Resultado:', fecha1 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log(`Caso 2: "${añoFuturo}-02-28" (febrero no bisiesto)`);
const fecha2 = Validaciones.isValidDate(`${añoFuturo}-02-28`);
console.log('Resultado:', fecha2 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log(`Caso 3: "${añoBisiesto}-02-29" (año bisiesto 2024)`);
const fecha3 = Validaciones.isValidDate(`${añoBisiesto}-02-29`);
console.log('Resultado:', fecha3 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log(`Caso 4: "${añoFuturo}-01-01" (primer día del año)`);
const fecha4 = Validaciones.isValidDate(`${añoFuturo}-01-01`);
console.log('Resultado:', fecha4 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Fechas inválidas
console.log('❌ FECHAS INVÁLIDAS:');
console.log('Caso 5: "31-12-2025" (formato incorrecto)');
const fecha5 = Validaciones.isValidDate('31-12-2025');
console.log('Resultado:', fecha5 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log('Caso 6: "2025/12/31" (separador incorrecto)');
const fecha6 = Validaciones.isValidDate('2025/12/31');
console.log('Resultado:', fecha6 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log(`Caso 7: "${añoFuturo}-13-01" (mes 13)`);
const fecha7 = Validaciones.isValidDate(`${añoFuturo}-13-01`);
console.log('Resultado:', fecha7 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log(`Caso 8: "${añoFuturo}-02-30" (30 de febrero)`);
const fecha8 = Validaciones.isValidDate(`${añoFuturo}-02-30`);
console.log('Resultado:', fecha8 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log(`Caso 9: "${añoPasado}-02-29" (año no bisiesto ${añoPasado})`);
const fecha9 = Validaciones.isValidDate(`${añoPasado}-02-29`);
console.log('Resultado:', fecha9 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log('Caso 10: "1800-01-01" (año < 1900)');
const fecha10 = Validaciones.isValidDate('1800-01-01');
console.log('Resultado:', fecha10 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log('Caso 11: "2101-01-01" (año > 2100)');
const fecha11 = Validaciones.isValidDate('2101-01-01');
console.log('Resultado:', fecha11 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log(`Caso 12: "${añoPasado}-01-01" (fecha pasada - ${añoPasado})`);
const fecha12 = Validaciones.isValidDate(`${añoPasado}-01-01`);
console.log('Resultado:', fecha12 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log(`Caso 13: "${añoPasado}-01-01" con permitirPasado=true`);
const fecha13 = Validaciones.isValidDate(`${añoPasado}-01-01`, true);
console.log('Resultado:', fecha13 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

console.log(`Caso 14: "2026-03-19" (fecha actual - hoy)`);
const fecha14 = Validaciones.isValidDate(`2026-03-19`);
console.log('Resultado:', fecha14 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');