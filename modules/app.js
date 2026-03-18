// modules/app.js
 import { Validaciones } from '../utils/validaciones.js';

 console.log('%c🧪 PRUEBAS DE VALIDACIONES', 'color: purple; font-size: 16px; font-weight: bold;');

console.log('📝 Probando isValidString:');
console.log('----------------------------------------');

// Caso 1: String válido
console.log('Caso 1: "HOLA MUNDO"');
const resultado1  = Validaciones.isValidString('Hola Mundo');
console.log('Resultado: ', resultado1 ? '✅ VALIDO' : '❌ INVALIDO');
console.log('----------------------------------------');

// Caso 2: String vacio
console.log('Caso 2: ""');
const resultado2 = Validaciones.isValidString('');
console.log('Resultado: ', resultado2 ? '✅ VALIDO' : '❌ INVALIDO');
console.log('----------------------------------------');

// Caso 3: String con solo espacios
console.log('Caso 3: "   "');
const resultado3 = Validaciones.isValidString('   ');
console.log('Resultado: ', resultado3 ? '✅ VALIDO' : '❌ INVALIDO');
console.log('----------------------------------------');

// Caso 4: Número en lugar de string
console.log('Caso 4: 123');
const resultado4 = Validaciones.isValidString(123);
console.log('Resultado: ', resultado4 ? '✅ VALIDO' : '❌ INVALIDO');
console.log('----------------------------------------');

// Caso 5: null
console.log('Caso 5: null');
const resultado5 = Validaciones.isValidString(null);
console.log('Resultado: ', resultado5 ? '✅ VALIDO' : '❌ INVALIDO');
console.log('----------------------------------------');

// Caso 6: String muy largo (con limite personalizado)
console.log('Caso 6: "a".repeat(200) con max=10');
const resultado6 = Validaciones.isValidString("a".repeat(200), 1, 10);
console.log('Resultado: ', resultado6 ? '✅ VALIDO' : '❌ INVALIDO');
console.log('----------------------------------------');

// Caso 7: String válido con limites personalizados
console.log('Caso 7: "JS" con min=2 max=5');
const resultado7 = Validaciones.isValidString("JS", 2, 5);
console.log('Resultado: ', resultado7 ? '✅ VALIDO' : '❌ INVALIDO');
console.log('----------------------------------------');

console.log('%c📧 Probando isValidEmail:', 'color: blue; font-size: 14px; font-weight: bold;');
console.log('----------------------------------------');
// Caso 1: Email válido simple
console.log('Caso 1: "usuario@dominio.com"');
const email = Validaciones.isValidEmail("usuario@dominio.com");
console.log('Resultado:', email ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 2: Email com puntos y guiones en usuario
console.log('Caso 2: "jose.rodriguez-23@empresa.com"');
const email2 = Validaciones.isValidEmail("jose.rodriguez-23@empresa.com");
console.log('Resultado:', email2 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 3: Email sin @
console.log('Caso 3: "usuariodominio.com"');
const email3 = Validaciones.isValidEmail('usuariodominio.com');
console.log('Resultado:', email3 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 4: Email con dos @
console.log('Caso 4: "usuario@domi@nio.com"');
const email4 = Validaciones.isValidEmail('usuario@domi@nio.com');
console.log('Resultado:', email4 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 5: Email con espacios
console.log('Caso 5: "usuario @dominio.com"');
const email5 = Validaciones.isValidEmail('usuario @dominio.com');
console.log('Resultado:', email5 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 6: Email sin extensión
console.log('Caso 6: "usuario@dominio"');
const email6 = Validaciones.isValidEmail('usuario@dominio');
console.log('Resultado:', email6 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 7: Email con extensión muy corta
console.log('Caso 7: "usuario@dominio.c"');
const email7 = Validaciones.isValidEmail('usuario@dominio.c');
console.log('Resultado:', email7 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 8: Email con extensión muy larga
console.log('Caso 8: "usuario@dominio.comercial"');
const email8 = Validaciones.isValidEmail('usuario@dominio.comercial');
console.log('Resultado:', email8 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 9: Email con caracteres especiales no permitidos
console.log('Caso 9: "usuario#$$@dominio.com"');
const email9 = Validaciones.isValidEmail('usuario#$$@dominio.com');
console.log('Resultado:', email9 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 10: Email con dominio que empieza con punto
console.log('Caso 10: "usuario@.dominio.com"');
const email10 = Validaciones.isValidEmail('usuario@.dominio.com');
console.log('Resultado:', email10 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 11: Email con subdominio
console.log('Caso 11: "usuario@sub.dominio.com"');
const email11 = Validaciones.isValidEmail('usuario@sub.dominio.com');
console.log('Resultado:', email11 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 12: Email con extensión de dos partes (ej: .co.uk)
console.log('Caso 12: "usuario@dominio.co.uk"');
const email12 = Validaciones.isValidEmail('usuario@dominio.co.uk');
console.log('Resultado:', email12 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');

// Caso 13: Email con guiones en dominio
console.log('Caso 13: "usuario@mi-dominio.com"');
const email13 = Validaciones.isValidEmail('usuario@mi-dominio.com');
console.log('Resultado:', email13 ? '✅ VÁLIDO' : '❌ INVÁLIDO');
console.log('----------------------------------------');
