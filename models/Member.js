const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      memberId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      account:{
        type: Sequelize.STRING(20),
        allowNull: true, // sns가입시 true 아닐시 validation체크
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true, //SNS로 로그인 하는경우 비밀번호 없을 수 있음.
      },
      name:{
        type: Sequelize.STRING(10),
        allowNull: false, // sns가입시 nickname으로..
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false, // sns가입시 nickname으로..
        unique: true,
      },
      email: {
        type: Sequelize.STRING(20),
        allowNull: true, // sns가입시 true 아닐시 validation체크
        unique: true,
      },
      image: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull: true, // sns가입시 주문 ..할시 등록요청
      },
      tel:{
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local', //local, kakao
      },
      snsId: {
        type: Sequelize.STRING(30), // sns 2499269871,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Member',
      tableName: 'member',
      paranoid: true,
      charset: 'utf8mb4', // 이모티콘 까지
      collate: 'utf8mb4_general_ci',
    })
  }
  static associate(db){
    db.Member.hasMany(db.Order, { foreignKey: 'memberId', sourceKey: 'memberId' });
    db.Member.hasMany(db.Delivery, { foreignKey: 'memberId', sourceKey: 'memberId'});
  }
}