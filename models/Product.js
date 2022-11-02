const Sequelize = require('sequelize');

module.exports = class Product extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      productId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      productName:{
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      content:{
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      memo:{
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      productCount:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      custPrice:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sellPrice:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discPrice:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      discRate:{
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Product',
      tableName: 'product',
      paranoid: true,
      charset: 'utf8mb4', // 이모티콘 까지
      collate: 'utf8mb4_general_ci',
    })
  }
  static associate(db){
    db.Product.belongsTo(db.Brand, { foreignKey: 'brandId', targetKey: 'brandId' });
    db.Product.belongsToMany(db.Order, { foreignKey: 'productId', through: 'OrderItem' });
    db.Product.belongsToMany(db.Category, { foreignKey: 'productId', through: 'CategoryItem' });
  }
}