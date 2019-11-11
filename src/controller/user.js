const { exec } = require('../db/mysql')

const loginCheck = (username, password) => {
  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `
  return exec(sql).then(data => {
    return data[0] || {}
  })
}

module.exports = {
  loginCheck
}
