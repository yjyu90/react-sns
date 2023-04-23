const {DataTypes} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { //MySQL에는 posts 테이블 생성됨
        //id는 기본적으로 자동으로 1,2,3,4... 으로 순서대로 올라갑니다
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8',//이모티콘 쓰려면 mb4 넣어줘야 함
        collate: 'utf8_general_ci', //
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
}