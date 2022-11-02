const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const Member = require('../models/Member');

module.exports = () =>{
  passport.use(new LocalStrategy({
    usernameField: 'account',
    passwordField: 'password',
  }, async (account, password, done)=>{
    try {
      const exUser = await Member.findOne({where: {account}});
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) { // 비번이 맞으면
          // done(서버에러, 유저객체)
          done(null, exUser);
        } else {
          // done(서버에러, 유저객체, 실패했을 때 메시지)
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }))
}