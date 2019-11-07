const { loginCheck } = require('../controller/user.js');
const { SuccessModel, ErrorModel } =require('../model/resModel');

const handleUesrRouter = (req, res) => {
    const { method, path, body } = req;

        // 登陆接口
        if (method === 'POST' &&  path === '/api/user/login') {
            const { username, password } = body;
            const result = loginCheck(username, password)
            if (result) {
                return new SuccessModel()
            } else {
                return new ErrorModel('登录失败')
            }
        }
}

module.exports = handleUesrRouter