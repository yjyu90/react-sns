const express = require('express');

const router = express.Router();
const {User} = require('../models');
const bcrypt = require('bcrypt');
router.post('/', async (req, res, next)=> {
    try{
        const exUser= await User.findOne({
            where : {
                email: req.body.email,
            }
        });

        if(exUser){
            return res.status(403).send('이미 사용 중인 아이디입니다.');//
        }
        //200 성공
        //300 리다이렉트
        //400 클라이언트 에러
        //500 서버 에러
        const hashedPassword = await bcrypt.hash(req.body.password, 12);//salt 숫자는 높을수록 보안이 세진다.
        await User.create({
            email : req.body.email,
            nickname : req.body.nickname,
            password : hashedPassword,
        });
        res.setHeader('Access-Control-Allow-Origin', '*');//http://localhost:3060 또는 *
        res.status(201).send('ok');
    }catch (error){
        console.error(error);
        next(error);//http 500 에러 (서버 에러)
    }
});

module.exports = router;