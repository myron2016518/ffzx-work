/**
 * Created by yu.liu on 2016/2/2.
 */
/*****************************************************************
 jQuery Ajax封装通用类
 *****************************************************************/



/**
 * ***************************************************************************
 * 前端页面js引擎
 *      ***************************************************************************
 */
// TODO 格式还需进一步修改，采用strict方式。
(function($) {


   
    /**
     * ajax封装
     * url 发送请求的地址
     * type 请求方式("POST" 或 "GET")， 默认为 "GET"
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * successfn 成功回调函数
     * errorfn 失败回调函数
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * async 默认值: true。默认设置下，所有请求均为异步请求。如果需要发送同步请求，请将此选项设置为 false。
     *       注意，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
     */
    var executeAjax=function(url, type, data, successfn, errorfn, dataType, async) {
        async = (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
        type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
        dataType = (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;


        $.ajax({
            type: type,
            async: async,
            data: data,
            url: url,
            dataType: dataType,
            success: function(d){
                successfn(d);
            },
            error: function(e){
                errorfn(e);
            }
        });
    };

    /**
     * ajax封装
     * url 发送请求的地址
     * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     * errorfn 失败回调函数
     */
    var executeAjaxPost=function(url, data, successfn, errorfn) {
        data = (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
        $.ajax({
            type: "post",
            data: data,
            url: url,
            dataType: "json",
            success: function(d){
                successfn(d);
            },
            error: function(e){
                errorfn(e);
            }
        });
    };




    // ****************************************************************************************************
    // $.frontEngine.methodName形式调用
    // ****************************************************************************************************
    $.extend({
    	frontEngineAjax: {
            executeAjax: function(url, type, data, successfn, errorfn, dataType, async) {
                return executeAjax(url, type, data, successfn, errorfn, dataType, async);
            },
           
            executeAjaxPost: function(url, data, successfn, errorfn) {
                return executeAjaxPost(url, data, successfn, errorfn);
            }
        }
    });


}) (jQuery);






