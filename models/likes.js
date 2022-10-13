'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  likes.init({
    userId: {  //추가
      primaryKey: true, //userId라는 컬럼은 기본키로 선언하겠다
      type: DataTypes.INTEGER, // 이컬럼이 어떤타입으로 구성되어있는지 / INTEGER타입이다
    },
    postId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'likes',
    timestamps: false,
  });
  return likes;
};