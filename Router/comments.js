const express = require('express');  //익스프레스 라우터
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware')
const {comments} = require('../models'); //mysql model 유저

//댓글생성 // 로그인 토큰 필요
router.post('/:postId', authMiddleware, async(req, res) => {
	const {comment} = req.body
	const {postId} = req.params
	const {userId,nickname} = res.locals.user; //로그인 된 사용자
console.log("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	await comments.create({
		userId: userId,
		postId: postId,
		nickname:nickname,
		comment: comment,
	})
	console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
	return res.status(201).send({ message: "댓글을 작성하였습니다."});
});



//댓글 목록 조회  // 로그인 토큰 필요없음
router.get('/:_postId', async (req, res) => {
	const commentAll = await comments.findAll({})

	return res.json({
		data: commentAll.map((comment) => ({
			commentId: comment._id,
			userId: comment.userId,
			nickname: comment.user,
    		comment: comment.comment,
			createdAt: comment.createdAt,
			updatedAt: comment.updatedAt
		})),
	});
});



//댓글수정  // 로그인 토큰 필요
router.put('/:commentId', authMiddleware, async(req, res) => {
	const {commentId} =req.params;
	const {comment} =req.body;
	await comments.update({comment:comment},{
		where: {commentId:commentId}
	});
		return res.status(200).json({success:true, message:"댓글을 수정하였습니다."})
	});



//댓글삭제  // 로그인 토큰 필요
router.delete('/:commentId', authMiddleware, async(req, res) => {
	const {commentId} =req.params;
	await comments.destroy({where: {commentId:commentId}});
		return res.status(200).json({success:true, message:"댓글을 삭제하였습니다."})
});



module.exports = router;            //라우터를 app으로 내보내주기