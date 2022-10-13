'use strict'; //실제 데이터베이스안의 테이블을 만들기 위해사용/저절로만들어졌다
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      userId: { //id였는데 userId로 바꿔줬다
        allowNull: false, //null을 허용할건지 말건지 /기본키는 null을 사용하지않도록 구현해야한다
        autoIncrement: true, //기본키를 만드려고했을때 기본키의 값을 지정해주지않았을 경우 기존에 썼던 값에서 1씩추가해주세요=> userId를 지정하지않고 다른데이터를 삽입하려고할경우 자동적으로 1,2,3이렇게 id값이 증가된다
        primaryKey: true, //가장 기본적인문법: 이 userID라는 칼럼이 기본키를 나타낸다
        type: Sequelize.INTEGER //db안에서 컬럼이 어떤타입을 가지게될건지/INTEGER타입!
      },
      nickname: {
        type: Sequelize.STRING //얘네는 다 스트링타입
      },
      password: {
        type: Sequelize.STRING 
      },
      createdAt: {
        allowNull: false, //null허용안함
        type: Sequelize.DATE //date타입
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};