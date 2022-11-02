const Sequelize = require('sequelize');

module.exports = class Delivery extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      deliveryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      //memberId
      //deliveryId 1:1
      zipcode:{
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      address1:{
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      address2:{
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      address3:{
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Delivery',
      tableName: 'delivery',
      paranoid: true,
      charset: 'utf8mb4', // 이모티콘 까지
      collate: 'utf8mb4_general_ci',
    })
  }
  static associate(db){
    db.Delivery.belongsTo(db.Member, { foreignKey: 'memberId', targetKey: 'memberId' });
    db.Delivery.hasOne(db.Order, { foreignKey: 'deliveryId', sourceKey: 'deliveryId' });
    //db.Delivery.belongsTo(db.Order, { foreignKey: 'orderId', targetKey: 'orderId' });
  }
}