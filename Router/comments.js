const express = require('express');  //익스프레스 라우터
const router = express.Router();
const comments = require("../Schema/comment")

//댓글생성
router.post('/:_postId', async(req, res) => {
	const {user,password, content} = req.body

	const commentCreate = await comments.create({
		user,
		password,
		content
	})
	return res.status(201). json({ message: "댓글을 생성하였습니다."});
});



// //게시글상세조회
// router.get('/:_postId', async (req, res) => {

// 	const userId = req.params._postId;
// 	const postOne = await posts.findOne({userId});

// 	return res.json({
// 		 data: {
// 			user: postOne.user,
// 			content: postOne.content,
// 		 }});
// });


//댓글 목록 조회
router.get('/:_postId', async (req, res) => {
	const commentAll = await comments.find({}).sort({ createdAt: -1 }) //내림차순

	return res.json({
		data: commentAll.map((comment) => ({
			commentId: comment._id,
			user: comment.user,
      content: comment.content,
			createdAt: comment.createdAt
		})),
	});
});



//댓글수정
router.put('/:_commentId', async(req, res) => {
	const userId =req.params._commentId;
	const {password, content} =req.body;
	const commentPut = await comments.findOne({_id:userId})

	if (commentPut. password !== password){
		return res
		.status(400)
		.json({success: false, errorMessage:"비밀번호가 일치하지않습니다"});
	} else {
		await comments.updateOne({_id:userId},{$set:{content}});
		return res
		.status(200)
		.json({success:true, message:"댓글을 수정하였습니다."})
	}
});

//댓글삭제
router.delete('/:_commentId', async(req, res) => {
	const userId =req.params._commentId;
	const {password} =req.body;
	const commentDelete = await comments.findOne({_id:userId})

	if (commentDelete. password !== password){
		return res
		.status(400)
		.json({success: false, errorMessage:"비밀번호가 일치하지않습니다"});
	} else {
		await comments.deleteOne({_id:userId});
		return res
		.status(200)
		.json({success:true, message:"댓글을 삭제하였습니다."})
	}

});




module.exports = router;            //라우터를 app으로 내보내주기