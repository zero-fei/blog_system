const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
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
  return exec(sql)
}

const getDetail = id => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(data => data[0])
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title,content, author属性
  const { title, content, author } = blogData
  const createtime = Date.now()
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}','${content}','${createtime}','${author}');
  `
  return exec(sql).then(data => {
    return { id: data.insertId }
  })
}

const updateBlog = (id, blogData = {}) => {
  // blogData 是一个博客对象，包含title,content属性
  const { title, content } = blogData
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id} 
  `
  return exec(sql).then(data => {
    return data.affectedRows > 0
  })
  // return true
}

const delBlog = (id, author) => {
  // id 就是删除的id
  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(data => {
    return data.affectedRows > 0
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
