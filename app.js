const queryString = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 用户处理 post data
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({});
            return;
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({});
            return;
        }
        let postData = '';
        req.on('data', (chunk) => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            if (!postData) {
                resolve({});
                return;
            }
            // resolve(JSON.stringify(postData));
            resolve(JSON.parse(postData));
        })
    })
}
const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader("Content-typ", "application/json; charset=utf-8");

    // 获取path
    const { url } = req;
    req.path = url.split('?')[0];

    // 解析query
    req.query  = queryString.parse(url.split('?')[1]);

    getPostData(req).then((postData) => {
        req.body = postData;

        // 处理blog路由 
        const blogData = handleBlogRouter(req, res);
        if(blogData) {
            res.end(JSON.stringify(blogData)); 
            return;
        }

        // 处理user路由
        const userData = handleUserRouter(req, res);
        if(userData) {
            res.end(JSON.stringify(userData)); 
            return;
        }

        // 未命中路由
        res.writeHead('404', {"Content-type":"text/plain"});
        res.write("404 Not Found\n");
        res.end();
    })
}

module.exports = serverHandle;