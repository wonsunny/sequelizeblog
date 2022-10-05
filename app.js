const express = require('express');                 //express라는 라이브러리를 가져와서 express라는 변수에 담아준다
const app = express();                             // app 객체를 만들어서 express라는 변수를 실행 
const port = 3010;                                    //3000번 포트로 서버를 열어주겠다
const router = require("./Router/index.js") 

const connect = require("./Schema")   //스키마의 모듈을 가져와서 연결
connect();

const mongoose = require("mongoose") //몽구스

app.use(express.json());                              //전역미들웨어
app.use("/api",router)




app.listen(port, () => { // 서버가 열렸을때 메시지출력하기
  console.log(port, '포트로 서버가 열렸어요!');
});