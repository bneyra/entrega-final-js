// Importa faker desde @faker-js/faker
const { faker } = require('@faker-js/faker');
const fs = require('fs');

function generateUsers(numberOfUsers = 100) {
  let users = [];
  for (let id = 1; id <= numberOfUsers; id++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();

    users.push({
      id: id,
      firstname: firstName,
      lastname: lastName,
      email: email
    });
  }

  return { data: users };
}

const numberOfUsers = 100; // Valor según sea necesario
const generatedData = generateUsers(numberOfUsers);

// Escribe los datos generados en un archivo data.json
try {
  fs.writeFileSync('data.json', JSON.stringify(generatedData, null, '\t'), 'utf8');
  console.log('Usuarios generados y guardados en data.json');
} catch (error) {
  console.error('Error al guardar el archivo:', error);
}
