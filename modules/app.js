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