const passport = require('passport');
const kakao = require('./kakaoStrategy');
const local = require('./localStrategy');
const Member = require('../models/Member');

module.exports = () =>{

  passport.serializeUser((member, done) => {
    done(null, member)
  });
  // 로그인 이후 요청
  passport.deserializeUser(async(id, done)=>{
    try {
      const member = await Member.findOne({where:{ memberId : id}})
      done(null, member);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });
  local();
  kakao();
}