const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const Member = require('../models/Member');

module.exports = () => {
  
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    callbackURL: '/auth/kakao/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    // console.log('kakao profile', profile);
    // console.log(profile._json.kakao_account.profile);
    console.log(accessToken);
    try {
      const exUser = await Member.findOne({
        where: { snsId: profile.id, provider: 'kakao' },
      });
      if (exUser) { // 회원이 존재하면 로그인처리
        done(null, exUser); // routes/auth.js 의  /auth/kakao/callback 위에 지정한 콜백으로 
      } else {  // 회원이 없으면 가입후 로그인처리
        const newUser = await Member.create({
          email: profile._json && profile._json.kakao_account.email, //현재 이메일은 선택동의를 해야 제공됨..
          name: profile.displayName,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
        });
        done(null, newUser); // routes/auth.js 의  /auth/kakao/callback 위에 지정한 콜백으로 
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};