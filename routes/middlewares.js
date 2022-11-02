const Member = require('../models/Member');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 유저 존재 유무
exports.existMember = async(req, res, next) =>{
  const { account } = req.body;
  const member = await Member.findOne({where: {account}});
  if(member){
    req.member = member;
    return next();
  }
  return res.status(200).json({ rslt_cd:'FAIL', rslt_msg: '아이디가 존재하지 않습니다.' });
}

// 비밀번호 검증
exports.verifyPass = async(req, res, next) =>{
  const cmprPass = await bcrypt.compare(req.body.password, req.member.password);
  if(cmprPass){
    return next();
  }
  return res.status(200).json({ rslt_cd:'FAIL', rslt_msg: '비밀번호가 일치하지 않습니다.' });
}

// 토큰 검증
exports.verifyToken = async(req, res, next) =>{
  try {// 클라이언트가 보낸 header의 jwt와 서버의 jwt verify(검증)
    req.decoded = jwt.verify(req.session.token, process.env.JWT_SECRET);
    // req.decoded에 데이터 넣기
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
}