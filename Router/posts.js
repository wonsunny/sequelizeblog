const express = require('express');   //익스프레스 라우터
const router = express.Router();
const posts = require("../Schema/post")


//게시글작성
router.post('/', async(req, res) => {
	const {user, password, title, content} = req.body

	const postCreate = await posts.create({
		user,
		password,
		title,
		content
	})
	return res.status(201). json(
		{  "message": "게시글을 생성하였습니다."});
});

//게시글조회
router.get('/', async (req, res) => {
	const postAll = await posts.find({}).sort({ createdAt: -1 }) //내림차순

	return res.json({
		data: postAll.map((post) => ({
			postId: post._id,
			user: post.user,
			title: post.title,
			createdAt: post.createdAt
		})),
	});
});

//게시글상세조회
router.get('/:_postId', async (req, res) => {

	const userId = req.params._postId;
	const postOne = await posts.findOne({_id:userId});

	return res.json({
		 data: {
			postId: postOne._id,
			user: postOne.user,
			title: postOne.title,
			content: postOne.content,
			createdAt: postOne.createdAt
		 }});
});

//게시글수정
router.put('/:_postId', async(req, res) => {
	const userId =req.params._postId;
	const {password, title, content} =req.body;
	const postPut = await posts.findOne({_id:userId})

	if (postPut. password !== password){
		return res
		.status(400)
		.json({success: false, errorMessage:"비밀번호가 일치하지않습니다"});
	} else {
		await posts.updateOne({_id:userId},{$set:{title,content}});
		return res
		.status(200)
		.json({success:true, "message":"게시글을 수정하였습니다."})
	}
});

//게시글삭제
router.delete('/:_postId', async(req, res) => {
	const userId =req.params._postId;
	const {password} =req.body;
	const postDelete = await posts.findOne({_id:userId})

	if (postDelete. password !== password){
		return res
		.status(400)
		.json({success: false, errorMessage:"비밀번호가 일치하지않습니다"});
	} else {
		await posts.deleteOne({_id:userId});
		return res
		.status(200)
		.json({success:true, "message":"게시글을 삭제하였습니다."})
	}

});




module.exports = router;             //라우터를 app으로 내보내주기