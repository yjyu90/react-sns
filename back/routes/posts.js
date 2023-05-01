const express = require('express');
const { Op } = require('sequelize');

const { Post, Image, User, Comment } = require('../models');

const router = express.Router();

//게시글 여러 개 조회
router.get('/', async (req, res, next) => { // GET /posts
  console.log('req.headers' + req.headers);
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    //findAll 전체 조회
    const posts = await Post.findAll({
      where,
      limit: 10,//10개 단위로 가져오기 <-> offset : 0 의미 1번 ~ 10번 게시글 가져오기, offset : 10 의미 11번 ~ 20번 게시글 가져오기
      order: [
        ['createdAt', 'DESC'],//Post 테이블 createdAt 컬럼 기준 DESC
        [Comment, 'createdAt', 'DESC'],//Comment 테이블 createdAt 컬럼 기준 DESC
      ],
      include: [{
        model: User,//게시글 작성자 정보
        attributes: ['id', 'nickname'],
      }, {
        model: Image,//게시글에 속한 이미지들
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
