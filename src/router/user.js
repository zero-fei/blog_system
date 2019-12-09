const { set } = require('../db/redis')
const { login } = require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUesrRouter = (req, res) => {
  const { method, path, body } = req

  // 登陆接口
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = body
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 设置session
        req.session.username = data.username;
        req.session.realname = data.realname;
        // 同步到redis
        set(req.sessionId, req.session)
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }
}

module.exports = handleUesrRouter
