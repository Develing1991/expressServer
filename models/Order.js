const Sequelize = require('sequelize');

module.exports = class Order extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      orderId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      //memberId
      //deliveryId 1:1
      orderName:{
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: true, //SNS로 로그인 하는경우 비밀번호 없을 수 있음.
      },
      count:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalAmount:{
        type: Sequelize.INTEGER,
        allowNull: false, 
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Order',
      tableName: 'order',
      paranoid: true,
      charset: 'utf8mb4', // 이모티콘 까지
      collate: 'utf8mb4_general_ci',
    })
  }
  static associate(db){
    db.Order.belongsTo(db.Member, { foreignKey: 'memberId', targetKey: 'memberId' });
    //db.Order.hasOne(db.Delivery, { foreignKey: 'orderId', sourceKey: 'orderId' });
    db.Order.belongsTo(db.Delivery, { foreignKey: 'deliveryId', targetKey: 'deliveryId' });
    db.Order.belongsToMany(db.Product, { foreignKey: 'orderId', through: 'OrderItem' }); // N : M
  }
}