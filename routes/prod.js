const express = require('express');
const Category = require('../models/Category');
const Product = require('../models/Product');
const router = express.Router();


router.post('/createProduct', async (req, res)=>{
  try {
    const { categoryId } = req.body;
    const category = await Category.findOne({where : {categoryId}});
    const product = await Product.create({
      ...req.body,
    })
    product.addCategories(category);
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '상품이 등록되었습니다.' })
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.post('/productList', async (req, res)=>{
  try {
    const productList = await Product.findAll({where : { ...req.body }})
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '', productList })
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.post('/productDetail', async (req, res)=>{
  try {
    const { productId } = req.body;
    const product = await Product.findOne({where : { productId }})
    const productCategories = await product.getCategories();
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '', product, productCategories })
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
