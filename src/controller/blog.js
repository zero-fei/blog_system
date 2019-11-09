const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  // 先返回假数据（格式是正确的）
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and keyword='${keyword}' `
  }
  sql += `order by createtime desc;`
  // 返回promise
  return exec(sql)
}

const getDetail = id => {
  return {
    id: '1',
    title: '标题A',
    content: '内容A',
    createTime: 1572794804531,
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title,content属性
  return {
    id: 3 // 新建博客id
  }
}

const updateBlog = (id, blogData = {}) => {
  // blogData 是一个博客对象，包含title,content属性
  return true
}

const delBlog = id => {
  // id 就是删除的id
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
