const queryString = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString();
}

// session 数据
const SESSION_DATA = {

}

// 用户处理 post data
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      // resolve(JSON.stringify(postData));
      resolve(JSON.parse(postData))
    })
  })
}
const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-typ', 'application/json; charset=utf-8')

  // 获取path
  const { url } = req
  req.path = url.split('?')[0]

  // 解析query
  req.query = queryString.parse(url.split('?')[1])

  //解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });

  // 解析session
  let needSetCookie = false;
  let { uesrId } = req.cookie
  if (uesrId) {
    if (!SESSION_DATA[uesrId]) SESSION_DATA[uesrId] = {};
  } else {
    needSetCookie = true;
    uesrId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[uesrId] = {};
  }
  req.session = SESSION_DATA[uesrId]

  getPostData(req).then(postData => {
    req.body = postData

    // 处理blog路由
    const bolgResult = handleBlogRouter(req, res)
    if (bolgResult) {
      bolgResult.then(blogData => {
        if (needSetCookie) res.setHeader('Set-Cookie', `uesrId=${uesrId}; path=/; httpOnly;expires=${getCookieExpires()}`)
        res.end(JSON.stringify(blogData))
      })
      return
    }

    // 处理user路由
    const userData = handleUserRouter(req, res)
    if (userData) {
      userData.then(userData => {
        if (needSetCookie) res.setHeader('Set-Cookie', `uesrId=${uesrId}; path=/; httpOnly;expires=${getCookieExpires()}`)
        res.end(JSON.stringify(userData))
      })
      return
    }

    // 未命中路由
    res.writeHead('404', { 'Content-type': 'text/plain' })
    res.write('404 Not Found\n')
    res.end()
  })
}

module.exports = serverHandle
