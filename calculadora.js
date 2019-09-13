'use strict'

var params = process.argv.slice(2);

var numero1 = parseFloat(params[0]);
var numero2 = parseFloat(params[1]);

var plantilla = `
La suma es ${numero1 + numero2},
la resta es: ${numero1 - numero2},
la multiplicacion es: ${numero1 * numero2},
la division es: ${numero1 + numero2}
`;

console.log(plantilla);
console.log(numero1);
console.log(numero2)
//console.log("Hola mundo desde NodeJS");