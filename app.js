const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors');

dotenv.config();
// const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const membRouter = require('./routes/memb');
const ordrRouter = require('./routes/ordr');
const brndRouter = require('./routes/brnd');
const prodRouter = require('./routes/prod');
const cateRouter = require('./routes/cate');
const dlvrRouter = require('./routes/dlvr');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
app.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:4001'],
  credentials: true,
})); 

passportConfig(); // 우리가 작성한 passport/index.js 연결
app.set('port', process.env.PORT || 3001);
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads'))); // front는 /img로 요청하니 path 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// 1
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
// 2
//passport 초기화 및 passport.session()
// 로그인 이후 다른 요청이 있을때 
// passport.session()이 동작하면 
// route/index.js의 deserializeUser가 동작
// 라우터 설정보다 위에

app.use(passport.initialize());
app.use(passport.session());

// app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/memb', membRouter);
app.use('/ordr', ordrRouter);
app.use('/brnd', brndRouter);
app.use('/prod', prodRouter);
app.use('/cate', cateRouter);
app.use('/dlvr', dlvrRouter);

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  //res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});