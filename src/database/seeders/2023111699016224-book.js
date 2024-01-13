'use strict';

import data from '../templates/book'
import {
  ENABLE_TEMPLATE_FULL
} from '../../config/common'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const time = Sequelize.literal('CURRENT_TIMESTAMP()');
    if (!ENABLE_TEMPLATE_FULL || !data(time).length) {
      return;
    }
    await queryInterface.bulkInsert('book', data(time), {});
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return await queryInterface.bulkDelete('book', null, {});
  }
};