const express = require('express');
const Brand = require('../models/Brand');
const router = express.Router();


router.post('/createBrand', async (req, res)=>{
  try {
    await Brand.create({
      ...req.body,
    })
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '브랜드가 등록되었습니다.' })
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

router.post('/brandList', async (req, res)=>{
  try {
    const brandList = await Brand.findAll({where : { ...req.body }})
    return res.status(200).json(brandList);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});


module.exports = router;
