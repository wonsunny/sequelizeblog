'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      commnetId: {
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.STRING
      },
      postId: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      },
      nickname: {
        type: Sequelize.STRING
      },
      like: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};