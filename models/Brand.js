const Sequelize = require('sequelize');

module.exports = class Brand extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      brandId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      brandName:{
        type: Sequelize.STRING(30),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Brand',
      tableName: 'brand',
      paranoid: true,
      charset: 'utf8mb4', // 이모티콘 까지
      collate: 'utf8mb4_general_ci',
    })
  }
  static associate(db){
    db.Brand.hasMany(db.Product, { foreignKey: 'brandId', sourceKey: 'brandId' });
  }
}