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
        db.Post.belongsTo(db.User);//다대일
        db.Post.belongsToMany(db.Hashtag, {through : "PostHashtag"});
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.User, {through : 'Like', as: 'Likers'});//좋아요
        db.Post.belongsTo(db.Post, { as : 'Retweet'});//1대다 관계
    };
    return Post;
}