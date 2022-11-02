const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const Member = require('../models/Member');
const {verifyToken} = require('./middlewares');


router.use(verifyToken);
router.post('/memberInfo', async (req, res)=>{
  try {
    const { memberId } = req.body;
    const MyInfo = await Member.findOne( {where : { memberId }});
    const MyAdresses = await MyInfo.getDeliveries();
    const MyOrder = await MyInfo.getOrders();
    return res.status(200).json({
      rslt_cd:'SUCC', 
      rslt_msg: '',
      MyInfo,
      MyAdresses,
      MyOrder
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json(error)
  }
});

router.post('/changePassword', async (req, res)=> {
  try {
    const { memberId, password } = req.body;
    const findMember = await Member.findOne({where: {memberId}});
    const hash = await bcrypt.hash(password, 12);
    findMember.update( {
      password : hash
    }, {
      where: { memberId }
    });
    return res.status(200).json({ rslt_cd:'SUCC', rslt_msg: '비밀번호가 변경되었습니다.' })
  } catch (error) {
    console.error(error);
    return res.status(500).json(error)
  }
})

module.exports = router;