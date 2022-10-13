const router = require('express').Router();
// const User = require('./../Schema/users')
const jwt = require("jsonwebtoken"); //jwt라이브러리 가져오기
const authMiddleware = require('../middlewares/auth-middleware');

const {users} = require('../models'); //mysql model 유저

//로그인 api/ 로그인 토큰 필요없음
router.post("/auth", async (req, res) => { //auth는 로그인경로, 프론트에서 시킴
  try{
  if(req.cookies.token) {
    res.send({message: "이미 로그인이 되어있습니다"})
    return; //밑으로 안내려가게!!!!
  }


    const { nickname, password } = req.body;
  
    const user = await users.findOne({ //하나찾아서 둘이일치하는지 확인
      where: {
        nickname, password
      }})

      console.log(user)
    if (!user) {
      res.status(400).send({
        errorMessage: "닉네임 또는 패스워드를 확인해주세요.", //자세히말하지말기
      });
      return;
    }


    const token = jwt.sign({userId:user.userId}, "wonsunny-secret-key")//
    res.cookie('token',token) //만든토큰을 '토큰'이라는 이름으로 쿠키에 보낸다
    res.send({
      token,
    })

  }
  catch(err){
      console.log(err);
      res.status(500).send(err);
      // res.status(500).send({
      //     errorMessage:'서버끄지마'
      // });
      return;
  }


  });
  


  
  module.exports= router //포장


