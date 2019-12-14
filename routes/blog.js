const router = require('koa-router')()

const { getList, getDetail, newBlog, delBlog, updateBlog } = require('../controller/blog')
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/blog')

router.get('/list', async (ctx, next) => {
  let { author = '', keyword = '', isadmin } = ctx.query
  if (isadmin) {
    //  管理员界面
    if (ctx.session.username === null) {
      ctx.body = new ErrorModel('未登录')
      return
    }
    // 强制查询自己的博客
    author = ctx.session.username
  }
  const listData = await getList(author, keyword)
  return (ctx.body = new SuccessModel(listData))
})

router.get('/detail', async (ctx, next) => {
  const result = await getDetail(ctx.query.id)
  return (ctx.body = new SuccessModel(result))
})

router.post('/new', loginCheck, async (ctx, next) => {
  const { body } = ctx.request
  body.author = ctx.session.username
  const result = await newBlog(body)
  return (ctx.body = new SuccessModel(result))
})

router.post('/update', loginCheck, async (ctx, next) => {
  const result = await updateBlog(ctx.query.id, ctx.request.body)
  return (ctx.body = result ? new SuccessModel() : new ErrorModel('更新博客失败'))
})

router.post('/del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const result = await delBlog(ctx.query.id, author)
  return (ctx.body = result ? new SuccessModel() : new ErrorModel('删除博客失败'))
})
module.exports = router
