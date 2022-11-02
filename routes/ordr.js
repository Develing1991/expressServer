const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const router = express.Router();

router.post('/createOrder', async (req, res)=>{
  try {
    const { memberId, deliveryId, orderName, totalAmount, productId, count, price, zipcode, address1, address2, address3,  } = req.body;
    
    const order = await Order.create({ memberId, deliveryId, orderName, totalAmount, count, price });
    const product = await Product.findOne({ where: {productId} });
    order.addProduct(product);
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '주문이 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.post('/orderList', async (req, res)=>{
  try {
    const orderList = await Order.findAll({where : { ...req.body }});
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '', orderList });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.post('/orderDetail', async (req, res)=>{
  try {
    const { orderId } = req.body;
    const findOrder = await Order.findOne({where : { orderId }})
    //const orderItems = await findOrder.getOrderItems();
    const orderMember = await findOrder.getMember();
    const orderProducts = await findOrder.getProducts();
    const orderDelivery = await findOrder.getDelivery();
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '', findOrder, orderMember, orderProducts, orderDelivery});
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
