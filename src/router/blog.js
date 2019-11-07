const { 
    getList, 
    getDetail,
    newBlog,
    delBlog,
    updateBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } =require('../model/resModel');

const handleBlogRouter = (req, res) => {
    const { method, path } = req;
    const { id } = req.query;

    // 获取博客列表
    if (method === 'GET' &&  path === '/api/blog/list') {
        const { author = '', keyword = '' }  = req.query;
        const listData = getList(author, keyword);
        return new SuccessModel(listData);
    }

    // 获取博客详情
    if (method === 'GET' &&  path === '/api/blog/detail') {
        const data = getDetail(id);
        return new SuccessModel(data)
    }

    // 新建一篇博客
    if (method === 'POST' &&  path === '/api/blog/new') {
        const blogData = req.body;
        const data = newBlog(blogData);
        return new SuccessModel(data);
    }   
    
    // 更新一篇博客
    if (method === 'POST' &&  path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('更新博客失败')
        }
    } 

    // 删除一篇博客
    if (method === 'POST' &&  path === '/api/blog/delete') {
        const result = updateBlog(id)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('删除博客失败')
        }
    }      
}

module.exports = handleBlogRouter;