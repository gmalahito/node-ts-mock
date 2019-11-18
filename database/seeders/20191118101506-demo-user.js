'use strict';
const bcrypt = require('bcrypt');

let passwordHash = bcrypt.hashSync('secret', bcrypt.genSaltSync(8), null);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        name: 'Pedro Penduko',
        username: 'pedro',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
