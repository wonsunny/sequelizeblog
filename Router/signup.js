const router = require('express').Router();
const User = require('./../Schema/users') //mongoDB Schema 유저
const authMiddleware = require('../middlewares/auth-middleware')
const { Op } = require("sequelize");  //sequelize변경

  //joi
  const Joi = require("joi");
const {users} = require('../models'); //mysql model 유저

  const signupSchema = Joi.object({
        nickname: Joi.string()
        .alphanum() //알파벳이나 숫자/알파벳 대소문자(a~z, A~Z), 숫자(0~9)
        .min(3) //최소길이3글자
        .required(), //필수값

    password: Joi.string()
        .min(4),

    confirm: Joi.string()
        .min(4)
  })

//회원가입 api
router.post("/", async (req, res) => {   // 로그인 토큰 필요없음

    const {authorization} = req.headers;
    if(authorization) {
        res.send({message: "이미 로그인이 되어있습니다"})
      }
    try{
        const {nickname, password, confirm} =await signupSchema.validateAsync(req.body);

    if (password !== confirm) {
        res.status(400).send({
            errorMessage: '패스워트가 패스워드 확인란과 동일하지 않습니다',
        });
    }
    const existsUsers = await users.findOne({   // nickname이 동일한게 이미 있는지 확인하기 위해 가져온다.
        where:{  // //sequelize변경
        nickname:nickname //뒤에는 바디에서 받은 닉네임 앞은 키!디비에있음
    },
});console.log(existsUsers)
    if(nickname === password){
        res.status(400).send({
            errorMessage: '회원가입실패'
        })
    }
    if (existsUsers!==null){  //보안을 위해 인증 메세지는 자세히 설명하지 않는다
        res.status(400).send({
            errorMessage:'중복된 닉네임 입니다',
        })
        return;
    }
    
    // const user = new User({nickname, password});
    // await user.save();

    // res.status(201).send({message: '회원가입에 성공하였습니다'})

    await users.create({nickname,password}); //sequelize변경

    res.status(201).send({message: '회원가입에 성공하였습니다'});


}
catch(err){
    // console.log(err);
    // res.status(500).send(err);
    res.status(500).send({
        errorMessage:err.message
    });
    return;
}
})




module.exports= router //포장