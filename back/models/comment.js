const {DataTypes} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { //MySQL에는 posts 테이블 생성됨
        //id는 기본적으로 자동으로 1,2,3,4... 으로 순서대로 올라갑니다
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        //UserId : 1 (belongsTo 쪽에 id가 생긴다.)
        //PostId : 3 (belongsTo 쪽에 id가 생긴다.)
    }, {
        charset: 'utf8mb4',//이모티콘 쓰려면 mb4 넣어줘야 함
        collate: 'utf8mb4_general_ci', //이모티콘 저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
}