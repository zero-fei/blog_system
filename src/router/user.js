const handleUesrRouter = (req, res) => {
    const { method, path } = req;

        // 登陆接口
        if (method === 'POST' &&  path === '/api/user/login') {
            return {
                msg: '这是登陆接口的接口'
            }
        }
}

module.exports = handleUesrRouter