'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init({
    postId: {  //추가
      primaryKey: true, //userId라는 컬럼은 기본키로 선언하겠다
      allowNull: false, //빈값을 허용하지않는다
      autoIncrement: true, //숫자를 자동으로 매겨줌
      type: DataTypes.INTEGER, // 이컬럼이 어떤타입으로 구성되어있는지 / INTEGER타입이다
    },
    userId: {  //추가
      type: DataTypes.INTEGER, // 이컬럼이 어떤타입으로 구성되어있는지 / INTEGER타입이다
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    nickname: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};