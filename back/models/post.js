const {DataTypes} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { //MySQL에는 posts 테이블 생성됨
        //id는 기본적으로 자동으로 1,2,3,4... 으로 순서대로 올라갑니다
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',//이모티콘 쓰려면 mb4 넣어줘야 함
        collate: 'utf8mb4_general_ci', //이모티콘 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);//다대일 //post.addUser, post.getUser (게시글의 작성자 가져오기), post.removeUser, post.setUser (게시글의 작성자 수정)
        db.Post.belongsToMany(db.Hashtag, {through : "PostHashtag"}); //post.addHashtags, post.getHashtags, post.removeHashtags, post.setHashtags (게시글의 해시태그 수정)
        db.Post.hasMany(db.Comment); //post.addComments, post.getComments (게시글의 댓글 가져오기), post.removeComments, post.setComments (게시글의 댓글 수정)
        db.Post.hasMany(db.Image); //post.addImages, post.getImages, post.removeImages, post.setImages (게시글의 이미지 수정)
        db.Post.belongsToMany(db.User, {through : 'Like', as: 'Likers'});//좋아요 -> post.addLikers (게시글 좋아요 처리), post.removeLikers (게시글 좋아요 제거 -> 좋아요 취소), post.getLikers (좋아요 누른 사람 수), post.setLikers (게시글의 좋아요 수정) 만들어진다.
        db.Post.belongsTo(db.Post, { as : 'Retweet'});//1대다 관계 //post.addRetweet, post.getRetweet, post.removeRetweet, post.setRetweet (게시글 리트윗 수정)
    };
    return Post;
}
