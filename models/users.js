'use strict'; //익스프레스내에서 sequelize를 통해 데이터베이스안에 있는 정보를 사용, 조회, 삽입할때는 데이터베이스내의 정보가아니라 models안에있는 각각의 모델을 기준으로 사용한다
//데이터베이스에 있는 테이블을 사용하기위해사용한다
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    userId: {  //추가
      primaryKey: true, //userId라는 컬럼은 기본키로 선언하겠다
      type: DataTypes.INTEGER, // 이컬럼이 어떤타입으로 구성되어있는지 / INTEGER타입이다
    },
    nickname: DataTypes.STRING, //명령어로추가시킨건데 다스트링
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
    timestamps: false,

  });
  return users;
};