// Importa faker desde @faker-js/faker
const { faker } = require('@faker-js/faker');

// Genera datos falsos
const number = faker.number.int(); // Genera un número entero
const uuid = faker.string.uuid(); // Genera un UUID
const image = faker.image.url(); // Genera una URL de imagen usando el método actualizado
const word = faker.word.words(1); // Genera una palabra
const words = faker.word.words(10); // Genera una serie de palabras

console.log({ number });
console.log({ uuid });
console.log({ image });
console.log({ word });
console.log({ words });
