const express = require('express')
const router = express.Router()
const { SuccessModel, ErrorModel } = require('../model/resModel.js')
const { login } = require('../controller/user')

router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then((data) => {
    if (data.username) {
      // 设置session
      req.session.username = data.username
      req.session.password = data.password
      res.json(new SuccessModel())
      return
    }
    res.json(new ErrorModel('登录失败'))
  })
  // res.json({
  //   errno: 0,
  //   data: {username, password}
  // })
})

module.exports = router
