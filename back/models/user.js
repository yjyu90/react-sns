const {DataTypes} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //MySQL에는 users 테이블 생성됨
        //id는 기본적으로 자동으로 1,2,3,4... 으로 순서대로 올라갑니다
        email: {
            type: DataTypes.STRING(30),
            allowNull : false, //필수
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull : false, //필수
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull : false, //필수
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', //한글 저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);//일대다
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, {through : 'Like', as: 'Liked'});//좋아요 누른 것들
        db.User.belongsToMany(db.User, {through : 'Follow', as: 'Followers', foreignKey : 'FollowingId'});//through : 테이블 이름을 바꿀 때,
        db.User.belongsToMany(db.User, {through : 'Follow', as: 'Followings', foreignKey : 'FollowerId'});
    };
    return User;
}