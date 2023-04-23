const express = require('express');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const db = require('./models');
const app = express();
const cors = require('cors');
db.sequelize.sync()
    .then(()=>{
        console.log('db 연결 성공');
    })
    .catch(console.error);
app.use(cors({
    origin : true,
    credentials : false,
}));//origin : true 로 설정해두면 * 대신 보낸 곳의 주소가 자동으로 들어가 편리합니다.
app.use(express.json());//json 데이터를 프론트의 req.body에 넣어준다
app.use(express.urlencoded({extended : true}));

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
app.use('/user', userRouter);

app.listen(3065, () => {
   console.log('서버 실행 중');
});