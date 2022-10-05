const express = require('express');   //익스프레스 라우터
const router = express.Router();

const postsRouter = require("./posts");          //posts 라우터 가져오기
const commentsRouter = require("./comments");     //comments 라우터 가져오기

router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
// app.use("/api", [commentsRouter,postsRouter]);               // 반환받을 라우터를 api에 express 적용하기
// app.use("/api/posts", [postsRouter]);
// app.use("/api/comments", [commentsRouter]);





module.exports = router;             //라우터를 app으로 내보내주기