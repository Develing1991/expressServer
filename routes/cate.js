const express = require('express');
const Category = require('../models/Category');
const router = express.Router();


router.post('/createCategory', async (req, res)=>{
  try {
    await Category.create({
      ...req.body,
    })
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '카테고리가 등록되었습니다.' })
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.post('/cateogryList', async (req, res)=>{
  try {
    const cateogryList = await Category.findAll({where : { ...req.body }})
    return res.status(200).json(cateogryList);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});


module.exports = router;
