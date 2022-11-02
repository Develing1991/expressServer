const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const Member = require('./Member');
const Order = require('./Order');
const Delivery = require('./Delivery');
const Product = require('./Product');
const Brand = require('./Brand');
const Category = require('./Category');


const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Member = Member;
db.Order = Order;
db.Delivery = Delivery;
db.Product = Product;
db.Brand = Brand;
db.Category = Category;

Member.init(sequelize);
Order.init(sequelize);
Delivery.init(sequelize);
Product.init(sequelize);
Brand.init(sequelize);
Category.init(sequelize);


Member.associate(db);
Order.associate(db);
Delivery.associate(db);
Product.associate(db);
Brand.associate(db);
Category.associate(db);

module.exports = db;