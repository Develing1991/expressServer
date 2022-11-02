const Sequelize = require('sequelize');

module.exports = class Category extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      categoryId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      categoryName:{
        type: Sequelize.STRING(10),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: true,
      modelName: 'Category',
      tableName: 'category',
      paranoid: true,
      charset: 'utf8mb4', // 이모티콘 까지
      collate: 'utf8mb4_general_ci',
    })
  }
  static associate(db){
    db.Category.belongsToMany(db.Product, { foreignKey: 'categoryId', through: 'CategoryItem' });
  }
}