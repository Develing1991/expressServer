const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Member = require('../models/Member');
const { existMember, verifyPass } = require('./middlewares')

const router = express.Router();

router.post('/dulpAcctCheck', async (req, res)=>{
  
  try {
    const { account } = req.body;
    const existUser = await Member.findOne({ where: { account } });
    if(existUser){
      return res.status(290).json({ rslt_cd:'FAIL', rslt_msg: '회원 아이디가 존재합니다.' });
    }
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '회원 아이디가 존재하지 않습니다.' });
  } catch (error) { 
    console.error(error);
    return res.status(500).json(error);
  }
})

router.post('/joinMember', async (req, res)=>{
  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    Member.create({
      ...req.body,
      password :hash
    });
    //res.redirect('/');
    return res.json({ rslt_cd:'SUCC', rslt_msg: '회원가입 성공' });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.post('/login', (req, res, next)=>{
  passport.authenticate('local', (authError, member, info)=>{
    if(authError){
      console.error(error);
      //return next(error);
      return res.status(200).json({ rslt_cd:'FAIL', rslt_msg: error.message });
    }
    if (!member) {
      return res.status(200).json({ rslt_cd:'FAIL', rslt_msg: info.message });
    }
    return req.login(member, (loginError) => {
      //passport.serializeUser의 done 이후 실행
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      
      const token = jwt.sign({
        id: member.account
      }, process.env.JWT_SECRET,{
        expiresIn: '10m',
        issuer: 'psykid'
      });
      req.session.token = token;
      // 세션 쿠키를 브라우저로 보내줌
      return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '로그인 되었습니다.' });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
  // try {
  //   const token = jwt.sign({
  //     id: req.body.account
  //   }, process.env.JWT_SECRET,{
  //     expiresIn: '10m',
  //     issuer: 'psykid'
  //   });
  //   req.session.token = token;
  //   console.log(token);
  //   return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '로그인 되었습니다.' });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ rslt_cd:'FAIL', rslt_msg: error.message });
  // }
})

router.get('/logout', (req, res) => {
  // req.user가 있음
  //req.logout(); // 세션 쿠키를 지워버림 ( 세션이 풀리면 로그아웃임 )
  //req.session.destroy(); // 세션 자체를 파괴
  req.logout(function(err){
    if(err){
      return next(err);
    }
    req.session.destroy(); // 세션 자체를 파괴
    //res.redirect('/');
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '로그아웃 되었습니다.' });
  })
});

// kakaoStrategy가기전에 실제 카카오 로그인을 함
// passport.authenticate('kakao') -> kakaoStrategy
// 카카오톡 로그인이 안되어있으면 카카오 로그인창
// 로그인 되어있으면 kakaoStrategy 및 callback까지 실행
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인하면 done 콜백을 우리가 등록한 콜백을 카카오에서 쏴줌
// passport.authenticate('kakao') -> kakaoStrategy
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  const token = jwt.sign({
    id: req.user.email
  }, process.env.JWT_SECRET,{
    expiresIn: '10m',
    issuer: 'psykid'
  });
  req.session.token = token;
  return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '카카오 로그인 되었습니다.' });
  //res.redirect('/');
});
module.exports = router;