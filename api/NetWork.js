const tokenKey = "token";
// const serverUrl =  "http://8.140.125.78:8011";
const serverUrl =  "http://localhost:8011";
// 例外不用token的地址
const exceptionAddrArr = ['/account/login'];

//请求头处理函数
function CreateHeader(url, type) {
    let header = {}
    if (type === 'POST_PARAMS'){
        header = {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }else{
        header = {
            'content-type': 'application/json'
        }
    }
    if (exceptionAddrArr.indexOf(url) === -1) {  //排除请求的地址不需要token的地址
        let token = uni.getStorageSync(tokenKey);
        // header.Authorization = token;
        header['Bearer'] = token;
    }
    return header;
}
//post请求，数据在body中
function postRequest(url,data){
    let header = CreateHeader(url,'POST');
    console.log(header,'header')
    return new Promise((resolve, reject) => {
        wx.request({
            url: serverUrl + url,
            data: data,
            header: header,
            method: 'POST',
            success: (res => {
                if (res.statusCode === 200) {
                    //200: 服务端业务处理正常结束
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }),
            fail: (res => {
                reject(res)
            })
        })
    })
}
//post请求，数据按照query方式传给后端
function postParamsRequest(url, data) {
    let header = CreateHeader(url,'POST_PARAMS');
    let useurl = url;
    console.log(useurl);
    return new Promise((resolve, reject) => {
        wx.request({
            url: serverUrl + useurl,
            data: data,
            header: header ,
            method: 'POST',
            success: (res => {
                console.log(res, '1212')
                if (res.statusCode === 200) {
                    //200: 服务端业务处理正常结束
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }),
            fail: (res => {
                reject(res)
            })
        })
    })
}
//get 请求
function getRequest(url, data) {
    let header = CreateHeader(url, 'GET');
    return new Promise((resolve, reject) => {
        wx.request({
            url: serverUrl + url,
            data: data,
            header: header,
            method: 'GET',
            success: (res => {
                if (res.statusCode === 200) {
                    //200: 服务端业务处理正常结束
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }),
            fail: (res => {
                reject(res.data)
            })
        })
    })
}
//put请求
function putRequest(url, data) {
    let header = CreateHeader(url, 'PUT');
    return new Promise((resolve, reject) => {
        wx.request({
            url: serverUrl + url,
            data: data,
            header: header,
            method: 'PUT',
            success: (res => {
                if (res.statusCode === 200) {
                    //200: 服务端业务处理正常结束
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }),
            fail: (res => {
                reject(res.data)
            })
        })
    })
}
//delete请求
function deleteRequest(url, data) {
    let header = CreateHeader(url, 'DELETE');
    return new Promise((resolve, reject) => {
        wx.request({
            url: serverUrl + url,
            data: data,
            header: header,
            method: 'DELETE',
            success: (res => {
                if (res.statusCode === 200) {
                    //200: 服务端业务处理正常结束
                    resolve(res.data)
                } else {
                    reject(res.data)
                }
            }),
            fail: (res => {
                reject(res)
            })
        })
    })
}
function uploadImg(url,filepath){
   return new Promise((resolve, reject) => {
       uni.uploadFile({
           url: serverUrl + url,
           filePath: filepath,
           name: 'file',
           header: {
               'content-type': 'multipart/form-data',
               'Bearer':uni.getStorageSync('token')
           },
           formData: { user: 'test', method: 'POST' },
           success: (res) => {
               if (res.statusCode === 200){
                   resolve(JSON.parse(res.data));
               }
           },
           fail: (res) => {
               reject(res.data)
           },
       })
   })
}
module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;
module.exports.postParamsRequest = postParamsRequest;
module.exports.putRequest = putRequest;
module.exports.deleteRequest = deleteRequest;
module.exports.uploadImg = uploadImg;
