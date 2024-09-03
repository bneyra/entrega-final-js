// Importa faker desde @faker-js/faker
const { faker } = require('@faker-js/faker');

// Genera fechas falsas
const weekday = faker.date.weekday();
const month = faker.date.month();
const pastDate = faker.date.past();
const futureDate = faker.date.future();
const recentDate = faker.date.recent();

console.log({ month });
console.log({ pastDate });
console.log({ futureDate });
console.log({ recentDate });
console.log({ weekday });
