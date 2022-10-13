const express = require('express');   //익스프레스 라우터
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')
const {Up} = require("sequelize")
const {posts} = require('../models'); //mysql model 유저



//게시글작성  // 로그인 토큰 필요
router.post('/', authMiddleware, async(req, res) => {

	const {title, content} = req.body;
	const {userId,nickname} = res.locals.user; //로그인 된 사용자
	const postCreate = await posts.create({
		title,
		content,
		userId,
		nickname
	})
	return res.status(201).send(	
		{  "message": "게시글 작성에 성공하였습니다."});
});

//게시글조회 // 로그인 토큰 필요없음
router.get('/', async (req, res) => {
	const postAll = await posts.findAll({})

	return res.json({
		data: postAll.map((post) => ({
			postId: post._id,//
			userId: post.userId, //
			nickname: post.user,
			title: post.title,//
			createdAt: post.createdAt,//
			updatedAt: post.updatedAt,
			likes: post.like //언제추가해주지..
		})),
	});
});

//게시글상세조회 // 로그인 토큰 필요없음
router.get('/:_postId', async (req, res) => {

	const postId = req.params._postId;
	const postOne = await posts.findByPk(postId);

	return res.json({
		 data: {
			postId: postOne._id,//
			userId: postOne.userId,//
			nickname: postOne.user,//
			title: postOne.title,//
			content: postOne.content,//
			createdAt: postOne.createdAt,//
			updatedAt: postOne.updatedAt,//
			likes: postOne.likes
		 }});
});

//게시글수정  // 로그인 토큰 필요
router.put('/:postId', authMiddleware, async(req, res) => {
	const {postId} = req.params;
	const {title, content} =req.body;

	await posts.update({title:title,content:content},{
		where: {
			postId:postId
		}
	})
		return res.status(200).json({success:true, "message":"게시글을 수정하였습니다."})
	});


//게시글삭제  // 로그인 토큰 필요
router.delete('/:postId', authMiddleware, async(req, res) => {
	const {postId} =req.params;
	await posts.destroy({where: {postId:postId}});
	console.log(postId)

	return res.status(200).json({success:true, "message":"게시글을 삭제하였습니다."})
});


module.exports = router;             //라우터를 app으로 내보내주기