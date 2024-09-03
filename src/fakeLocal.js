// Importa faker desde @faker-js/faker
const { faker } = require('@faker-js/faker');

// Genera nombres en inglés por defecto
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

// Muestra el nombre generado
console.log(`Empleado: ${firstName} ${lastName}`);

// Genera y muestra el mes
const month = faker.date.month();
console.log(month);

