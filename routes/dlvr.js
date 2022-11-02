const express = require('express');
const Delivery = require('../models/Delivery');
const router = express.Router();


router.post('/addAddress', async (req, res)=>{
  try {
    await Delivery.create({
      ...req.body,
    })
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '주소가 등록되었습니다' })
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});


module.exports = router;
