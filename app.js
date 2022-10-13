const express = require('express');                 //express라는 라이브러리를 가져와서 express라는 변수에 담아준다
const app = express();                             // app 객체를 만들어서 express라는 변수를 실행 
const port = 9000;                                    //서버열어주기
const mongoose = require("mongoose") //몽구스
const router = require("./Router/index.js") 
// const User = require("./Schema/users") //참조 
const { Op } = require("sequelize");  //sequelize변경
const { User } = require("./models");
const cookieParser = require('cookie-parser');

const authMiddleware = require("./middlewares/auth-middleware");
const Joi = require("joi");


//스키마의 모듈을 가져와서 연결
const connect = require("./Schema")   
connect();


// 몽구스
// mongoose.connect("mongodb://localhost/blog_login", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));


//joi
const postUsersSchema = Joi.object({  
  nickname: Joi.string().required(),
  password: Joi.string().required(),
  confirm: Joi.string().required(),
});

app.use(cookieParser());

app.use(express.urlencoded({ extended: false })); //이거도 써야되나..? 뭔지모르겠는데 넣어봄 /form-urlencoded 라는 규격의 body 데이터를 손쉽게 코드에서 사용할 수 있게 도와주는 미들웨어
app.use(express.json());                              //전역미들웨어 /JSON 이라는 규격의 body 데이터를 손쉽게 코드에서 사용할 수 있게 도와주는 미들웨어
app.use("/api",router)
app.use("/api", express.urlencoded({ extended: false }), router); //미들웨어..?
app.use(express.static("assets"));

// app.use((req, res, next) => {
//   console.log('Request URL:', req.originalUrl, ' - ', new Date()); //미들웨어..뭔지모르겠는데 넣어봄
//   next();
// });


app.listen(port, () => { // 서버가 열렸을때 메시지출력하기
  console.log(port, '포트로 서버가 열렸어요!');
});