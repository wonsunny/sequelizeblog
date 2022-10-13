// const jwt = require("jsonwebtoken");
// const {users} = require("../models");

// module.exports = (req, res, next) => {
//   // console.log(req.headers)
//   const {token} = req.cookies; //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzQ0ZDc0NGQyNzlkZDJkY2Y2NmEzNzMiLCJpYXQiOjE2NjU0NTYwODh9.a0TWBeHLZonlkCueIoTCkVCJ4x9KdYDxthOaLPTLe9w'
//   console.log(token)
//   if(!token){
//     res.send({message: "로그인이 필요합니다."})
//   return;
//   }

//   try {
//     const {userId} = jwt.verify(token, "wonsunny-secret-key"); // { userId: 유저의 아이디, iat(만료시간): 141231412}
//   // const userId = 6344d744d279dd2dcf66a373
//   console.log(userId)
//   User.findByPk(userId).then((user)=>{ // 고유한 userId를 갖고 있는 유저 한 명을 찾는 것
//       res.locals.user = user; //인증, 개쩌는거 // 여기서 어디서든 사용할 수 있게 로그인 된 사용자를 res.locals에 담는다. 
//       next();     //성공하면 라우터 실행
//     });
//   } catch(error) {
//     res.status(401).send({
//       errorMessage: error.errorMessage,
//     });
//     return;
//   }
// };


// if(authMiddleware){
//   res.status(400).send(
//     {  "message": "이미 로그인이 되어있습니다."});
// } else{
//   res.status(400).send(
//     {  "message": "로그인이 필요합니다."});
// }	 

const jwt = require("jsonwebtoken");
const { users } = require("../models");

module.exports = (req, res, next) => {
const { authorization } = req.headers;
const [authType, authToken] = (authorization || "").split(" ");

if (!authToken || authType !== "Bearer") {
res.status(401).send({
errorMessage: "로그인 후 이용 가능한 기능입니다.",
});
return;
}

try {
const { userId } = jwt.verify(authToken, "wonsunny-secret-key");
users.findByPk(userId).then((user) => {
res.locals.user = user;
next();
});
} catch (err) {
res.status(401).send({
errorMessage: "로그인 후 이용 가능합니다.",
});
}
};