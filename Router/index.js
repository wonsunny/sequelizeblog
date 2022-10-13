const express = require('express');   //익스프레스 라우터
const router = express.Router();

const likeRouter = require("./likes");      //좋아요 라우터 가져오기
const postsRouter = require("./posts");          //posts 라우터 가져오기
const commentsRouter = require("./comments");     //comments 라우터 가져오기
const signupRouter = require("./signup");     //회원가입 라우터 가져오기 /포장한거 갖고오는 곳
const loginRouter = require("./login");      //로그인 라우터 가져오기
const cookieParser = require('cookie-parser');

const {users} = require('../models'); //mysql model 유저

const app = express();


// /api
router.use("/posts", likeRouter)
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/signup", signupRouter);
router.use("/login", loginRouter);


// app.use("/api", [commentsRouter,postsRouter]);               // 반환받을 라우터를 api에 express 적용하기
// app.use("/api/posts", [postsRouter]);
// app.use("/api/comments", [commentsRouter]);


//헬로인덱스
router.get("/", (req,res)=>{
    res.send("helloindex")
})



module.exports = router;             //라우터를 app으로 내보내주기