const { getList } = require('../controller/blog');
const { SuccessModel, ErrorModel } =require('../model/resModel');

const handleBlogRouter = (req, res) => {
    const { method, path } = req;

    // 获取博客列表
    if (method === 'GET' &&  path === '/api/blog/list') {
        const { author = '', keyword = '' }  = req.query;
        const listData = getList(author, keyword);
        return new SuccessModel(listData);
    }

    // 获取博客详情
    if (method === 'GET' &&  path === '/api/blog/detail') {
        return {
            msg: '这是获取博客详情的接口'
        }
    }

    // 新建一篇博客
    if (method === 'POST' &&  path === '/api/blog/new') {
        return {
            msg: '这是新建一篇博客的接口'
        }
    }   
    
    // 更新一篇博客
    if (method === 'POST' &&  path === '/api/blog/update') {
        return {
            msg: '这是更新一篇博客的接口'
        }
    } 
    // 删除一篇博客
    if (method === 'POST' &&  path === '/api/blog/delete') {
        return {
            msg: '这是删除一篇博客的接口'
        }
    }      
}

module.exports = handleBlogRouter;