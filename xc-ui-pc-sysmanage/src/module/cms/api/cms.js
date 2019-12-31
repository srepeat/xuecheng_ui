import http from '@/base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//调用页面分页接口
export const page_list=(page,size,params) =>{
    //讲数据对象转换为key/value格式
    let query = querystring.stringify(params);
    //分页接口
    return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size+'?'+query);
}

//添加
export const page_add = params =>{
    return http.requestPost(apiUrl+'/cms/page/add',params);
}

//查询id
export const page_get = id =>{
    return http.requestQuickGet(apiUrl+'/cms/page/get/'+id);
}

//修改
export const page_edit = (id,params) =>{
   return http.requestPut(apiUrl+'/cms/page/edit/'+id,params);
}

//删除
export const page_del = id =>{
    return http.requestDelete(apiUrl+'/cms/page/del/'+id);
}

//页面发布
export const page_postPage = id =>{
    return http.requestPost(apiUrl+'/cms/page/postPage/'+id);
}

