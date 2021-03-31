'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('Questions',
        {
            id: {
              allowNull: false,
              autoIncrement: true,
              type: Sequelize.INTEGER,
              primaryKey: true
            },
            content: {
              type: Sequelize.STRING,
              allowNull: false
            },
            type: {
              type: Sequelize.ENUM('INPUT_TEXT', 'CHOICE'),
              allowNull: false,
              defaultValue: 'INPUT_TEXT'
            },
            choices: {
              type: Sequelize.JSONB,
              allowNull: true
            }
        },
        {
          timestamps: false,
          underscored: true
        }
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('Questions');
  }
};
