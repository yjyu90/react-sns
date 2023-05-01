const express = require('express');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');
const path = require('path');
const morgan = require('morgan');

const dotenv = require('dotenv');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

dotenv.config();
const app = express();
const cors = require('cors');



db.sequelize.sync()
    .then(()=>{
        console.log('db 연결 성공');
    })
    .catch(console.error);
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin : true,// origin : true 도 가능 http://localhost:3060
    credentials : true,//쿠키를 같이 전달하고자 하는 경우 사용 Access-Control-Allow-Credentials : true
}));//origin : true 로 설정해두면 * 대신 보낸 곳의 주소가 자동으로 들어가 편리합니다.

app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());//json 데이터를 프론트의 req.body에 넣어준다
app.use(express.urlencoded({extended : true}));//일반 form 처리

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: process.env.NODE_ENV === 'production' && '.nodebird.com'
    },
}));
app.use(passport.initialize());
app.use(passport.session());

//get 가져오다
//post 생성하다
//put 전체 수정
//delete 제거
//patch 부분 수정
//options 찔러보기
//head 헤더만 가져오기
app.get('/', (req, res) => {
    res.send('hello express');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, () => {
   console.log('서버 실행 중');
});
