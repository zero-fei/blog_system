const { exec } = require('../db/mysql')
const xss = require('xss')

const getList = async (author, keyword) => {
  // 先返回假数据（格式是正确的）
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  // 返回promise
  return await exec(sql)
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`
  const val = await exec(sql)
  return val[0]
}

const newBlog = async (blogData = {}) => {
  const { title, content, author } = blogData
  const createtime = Date.now()
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${xss(title)}','${content}','${createtime}','${author}');
  `
  const val = await exec(sql)
  return { id: val.insertId }
}

const updateBlog = async (id, blogData = {}) => {
  // blogData 是一个博客对象，包含title,content属性
  const { title, content } = blogData
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id} 
  `
  const val = await exec(sql)
  return val.affectedRows > 0
}

const delBlog = async (id, author) => {
  // id 就是删除的id
  const sql = `delete from blogs where id=${id} and author='${author}';`
  const val = await exec(sql)
  return val.affectedRows > 0
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
