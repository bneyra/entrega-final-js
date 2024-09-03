// Importa faker desde @faker-js/faker
const { faker } = require('@faker-js/faker');

// Genera información de usuario utilizando faker.person 
const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const jobTitle = faker.person.jobTitle();
const prefix = faker.person.prefix();
const suffix = faker.person.suffix();
const jobArea = faker.person.jobArea();

const phone = faker.phone.number();

console.log(`Employee: ${prefix} ${firstName} ${lastName} ${suffix}`);
console.log(`Job Title: ${jobTitle}`);
console.log(`Job Area: ${jobArea}`);
console.log(`Phone: ${phone}`);
