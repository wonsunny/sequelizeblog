const express = require('express');   //익스프레스 라우터
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');
// const likes = require('../Schema/likes');
// const posts = require('../Schema/post');

const {likes} = require('../models'); //mysql model 유저

//좋아요 게시글 조회  // 로그인 토큰 필요 /로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 조회할 수 있게 하기?
router.get('/like', authMiddleware, async (req, res) => {
    // const {postId} =req.params
    const {user} = res.locals; //로그인 된 사용자
    const userId = user._id //누가, 어떤게시글에

	const likeAll = await posts.findAll({}).sort({ createdAt: -1 }) //내림차순 /제일 좋아요가 많은 게시글을 맨 위에 정렬하기..?

	return res.json({
		data: likeAll.map((like) => ({
			postId: posts._id,
			userId: posts.userId,
			nickname: posts.user,
			title: posts.title,
			createdAt: posts.createdAt,
			updatedAt: posts.updatedAt,
            likes: posts.like
		})),
	});
});




//게시글좋아요  // 로그인 토큰 필요  /로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 좋아요 취소 할 수 있게 하기?

router.put('/:postId/like', authMiddleware, async(req,res) => {
 
    const {postId} =req.params
    const {user} = res.locals; //로그인 된 사용자
    const userId = user._id //누가, 어떤게시글에

    const likefind = await likes.findByPk({userId,postId})

    if(likefind==null){ //좋아요를 누르면 카운트 /누르는게아니라 찾아서
        await likes.create({userId, postId});
        await posts.updateOne({postId:postId},{$inc:{like:1}})
        return res.status(201).send({Message:"게시글의 좋아요를 등록하였습니다."})
    }else{ //또누르면 삭제
        await likes.deleteOne({userId, postId});
        await posts.updateOne({postId:postId},{$inc:{like:-1}})
        return res.status(201).send({Message:"게시글의 좋아요를 취소하였습니다."})
    }
})


// router.put('/:postId/like', authMiddleware, async(req, res) => {
// 	const {postId} = req.params;
// 	const {title, content} =req.body;

// 	const postPut = await posts.updateOne({_id:postId},{$set:{title,content}});
// 		return res.status(200).json({success:true, "message":"게시글을 수정하였습니다."})
// 	});



module.exports = router;            //라우터를 app으로 내보내주기