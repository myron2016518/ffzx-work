$(function(){
	
	//方法舍弃：做预留
	/*if($("#messageBox").length>0){
		var messageBoxTxt=$("#messageBox").attr("message");
		$.frontEngineDialog.executeDialogContentTime(messageBoxTxt,2000);
	}
	*/
	
	
	// 全选/反选
	$(".table tr th input[type='checkbox']").click("click", function() { 
		var evt = arguments[0] || window.event;
		var chkbox = evt.srcElement || evt.target;
		var checkboxes = $(".table tr td input[type='checkbox']");
		if (chkbox.checked) {
			checkboxes.prop('checked', true);
		} else {
			checkboxes.prop('checked', false);
		}
	
	});
	//批量删除按钮
	$("#table-deleteBtn").click("click", function() {
		delAccount();
	});
	//delete_item  ：删除单个
	$(".table tr td a[name='delete_item']").click("click", function() { 
		var url =this.href;
		$.frontEngineDialog.executeDialog('delete_table_info','信息','<i class="fa fa-question-circle fa-3x" style="color: #86CFF9;vertical-align:middle;"></i>　删除之后该信息会被彻底删除,是否继续？　　','100%','100%',
				function(){
					//window.location.href=url;
					common_doSave(url,"get");
				}
			);
		return false;
	});

	//enabled_item  ：禁用单个
	$(".table tr td a[name='enabled_item']").click("click", function() { 
		var url = this.href;
		$.frontEngineDialog.executeDialog('delete_table_info','信息','<i class="fa fa-question-circle fa-3x" style="color: #86CFF9;vertical-align:middle;"></i>　是否' + $(this).text() + '!','200','50',
				function(){
					//window.location.href=url;
					common_doSave(url,"get");
				}
			);
		return false;
	});
	
});


//删除
function delAccount() {
	var cbox =getSelectedCheckbox();
	if (cbox == "") {
		$.frontEngineDialog.executeDialogContentTime('请选择删除项！！',2000);
		return;
	}
	
	var url=rootPath+"/"+$("#table-deleteBtn").attr("table_action")+"?ids=";
	
	for (var i = 0; i < cbox.length; i++) {
		if(i==cbox.length-1){
			url=url+cbox[i];
		}else{
			url=url+cbox[i]+",";
		}
	}
	$.frontEngineDialog.executeDialog('delete_table_info','信息','<i class="fa fa-question-circle fa-3x" style="color: #86CFF9;vertical-align:middle;"></i>　删除之后该信息会被彻底删除,是否继续？　　','100%','100%',
		function(){
			//_tableDoSave(url,cbox);
			//window.location.href=url;
			common_doSave(url,"get");
			return true;
		}
	);
	//icon-question-sign　　　question-circle
}


/**
* 获取选中的值
*/
var getSelectedCheckbox = function(pagId) {
	if(pagId==''||pagId==undefined){
		pagId = 'table';
	}
	var arr = [];
	$("."+pagId+" tr td input[type='checkbox']:checkbox:checked").each(function() {
		arr.push($(this).val());
	});
	return arr;
};

//测试验证自定义函数
var getTest = function() {
	var isBoolean=false;
	var testVal=$("#name").val();
	if(testVal==""||testVal==null){
		isBoolean=false;
	}else{
		isBoolean=true;
	}
	return isBoolean;
};


/**
* 通用保持方法
*/
var common_doSave = function(url,type,id,data) {
	type = (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
	 var getdata = (id==null || id=="" || typeof(id)=="undefined")? data : $('#'+id).serialize();
	 
	 $.frontEngineAjax.executeAjax(
			 	url,
			 	type,
			 	getdata,
               function(data){
			 		if (data && 'success' == data.status) {		//成功
			 			$.frontEngineDialog.executeDialogContentTime('成功！',1000);
		 				if(data.url==null || data.url=="" || typeof(data.url)=="undefined"){
			 				
			 			}else{
			 				setTimeout(function() {
				 				window.location=rootPath+data.url;
							}, 1000);
			 			}
			 			
		         	} else if((data && 'error' == data.status)){		//错误
		         		$.frontEngineDialog.executeDialogContentTime(data.infoStr,4000);
		         	}else if((data && 'exception' == data.status)){		//异常
		         		$.frontEngineDialog.executeDialogContentTime(data.infoStr,4000);
		         	}else if((data && 'validates' == data.status)){		//验证错误多条
		         		var $rootInfoULi = $("#error_con ul");
			 			$("#error_con ul").html('');
			 			$("#error_con ul").show();
			 			$("#error_con").show();
			 			for (var key in data.infoMap) {
			 				var info = data.infoMap[key];
			 				// 图片路径待修改
			 				var infoHtml = '<li id="'+key+'-error" class="invalid" style="display: list-item;" >'+info+'</li>';
			 				$rootInfoULi.append(infoHtml);
			 			}
		         	}else if((data && 'validate' == data.status)){		//验证错误
		         		var $rootInfoULi = $("#error_con ul");
			 			$("#error_con ul").html('');
			 			$("#error_con ul").show();
			 			$("#error_con").show();
			 			var info = data.infoStr;
		 				// 图片路径待修改
		 				var infoHtml = '<li id="validateOne-error" class="invalid" style="display: list-item;" >'+info+'</li>';
		 				$rootInfoULi.append(infoHtml);
		 			
		         	}
               },
               function(){
               	$.frontEngineDialog.executeDialogContentTime('出错啦！',5000);
               	//$.frontEngineDialog.executeDialogContent('提示','出错啦！','200');
               	
               }
       );
};

/**
 * 弹出树形选择
 * title:弹出的标题
 * url：树形地址
 * id：操作元素弹出树形的id
 * id1：选择树形id保存在id1元素上
 * call：单击确定调用的函数(可以传函数或者函数名)
 * pId:父节点id，默认pId
 */
/**
 * 弹出树形选择 title:弹出的标题 url：树形地址 id：操作元素弹出树形的id id1：选择树形id保存在id1元素上
 * call：单击确定调用的函数(可以传函数或者函数名) pId:父节点id，默认pId
 */
function showTree(title, url, id, id1, call, pId) {
	pId = (pId == null || pId == "" || typeof (pId) == "undefined") ? "pId"
			: pId;
	var tree_setting = {
		data : {// 数据
			simpleData : {
				enable : true,// true / false 分别表示 使用 / 不使用 简单数据模式
				// 默认false，一般使用简单数据方式
				idKey : "id",// 节点数据中保存唯一标识的属性名称 默认值："id"
				pIdKey : pId
			// 点数据中保存其父节点唯一标识的属性名称 默认值："pId"
			},
			key : {
				url : ""
			}
		},
		view : {
			selectedMulti : false
		}
	};
	$("#" + id).blur();
	$.frontEngineAjax
			.executeAjaxPost(
					rootPath + url,
					"",
					function(ret) {
						var content = '<div class="showTreeBackground left"><div><input type="text" class="form-control input-sm txt_mid" style="height:31px;" id="shwo_tree_search_text"><button id="show_tree_search_btn" class="btn btn-primary btn-sm" style="margin-left:5px;" onclick="showTreeSearchClick()"><i class="fa fa-search"></i></button><div><ul id="show_tree" class="ztree"></ul></div>';
						$.frontEngineDialog
								.executeDialog(
										'showTree',
										title,
										content,
										"400px",
										"430px",
										function() {
											var treeObj = $.fn.zTree
													.getZTreeObj("show_tree");
											var nodes = treeObj
													.getSelectedNodes();
											if (nodes != null && nodes != "") {
												$("#" + id).val(nodes[0].name);
												$("#" + id1).val(nodes[0].id);

												if (call == null
														|| call == ""
														|| typeof (call) == "undefined") {
												} else {
													if (Object.prototype.toString
															.call(call) === '[object Function]') {
														call;
													} else {
														var fn = eval(call);
														fn();

													}
												}
											}
										});
						$.fn.zTree.init($("#show_tree"), tree_setting, ret);
					}, function(err) {
						$.frontEngineDialog.executeDialogOK('错误', err);
					});
}

/**
 * @param value 传入要转换的字符串
 * @param fun 传入结果处理方法,方法第一个参数为转换结果r,r.simple为简拼,r.full为全拼
 * */
function toPinyin(value,fun){
    if(value!=null && value!=''){
        $.post(rootPath+'/framework/pinyin/getPinyin.do',{value:value},function(res){
            if(typeof(fun)=='function'){
                fun.call(null,res);
            }
        },'json');
    }
}
/**
 * 设置简拼的值
 * @param chineseComp  输入中文的对象
 * @param simplePinyinComp  简拼组件
 */
function setSimplePinyinValue(chineseComp,simplePinyinComp){
	setPinyinValue(chineseComp, simplePinyinComp, true);
}
/**
 * 设置简拼的值
 * @param chineseComp  输入中文的对象
 * @param simplePinyinComp  简拼组件
 */
function setFullPinyinValue(chineseComp,fullPinyinComp){
	setPinyinValue(chineseComp, fullPinyinComp, false);
}
/**
 * 设置值
 * @param chineseComp  中文组件
 * @param pinyinComp  拼音组件 
 * @param flag  false:表示是全拼，true表示是简拼
 */
function setPinyinValue(chineseComp,pinyinComp,flag){
	$(chineseComp).bind('change',function(){
		toPinyin($(this).val(),function(result){
			$(pinyinComp).val(flag?result.simple:result.full);
		});
	});
}



/**
 * 树形内的 点击查询事件
 */
$("#treeSearch").click(function(){
	var name = $('#fuzzyQueryName').val();
	treeLocate('left_menu_tree','name',name);
})
var treeLocateCache = {};
/**
 * show_tree树形内的 点击查询事件
 */
function showTreeSearchClick() {
	var name = $('#shwo_tree_search_text').val();
	treeLocate('show_tree', 'name', name);
}

/**
 * 模糊查询函数
 */
function treeLocate(treeId,key,value){
	if(treeId){
		var tree = $.fn.zTree.getZTreeObj(treeId);
		if(tree){
			if(!treeLocateCache[treeId]){
				treeLocateCache[treeId] = {};
			}
			if(key && value){
				var idx = 0;
				if(treeLocateCache[treeId].key==key && treeLocateCache[treeId].value==value){
					idx = treeLocateCache[treeId].index || 0;
				}else{
					treeLocateCache[treeId].index = 0;
					treeLocateCache[treeId].key = key;
					treeLocateCache[treeId].value = value;
				}
				var nodes = tree.getNodesByParamFuzzy(key, value, null);
				if(nodes.length > 0){
					if(idx >= nodes.length){
						idx = 0;
					}
					if(idx < nodes.length){
						tree.expandNode(nodes[idx], true, false, true);
						tree.selectNode(nodes[idx]);
						treeLocateCache[treeId].index = ++idx;
					}
				}
			}else{
				treeLocateCache[treeId] = {};
			}
		}
	}
}

/**
 * 编辑或新增返回提示
 */
function isReturn(){
    //确认放弃当前录入内容
	$.frontEngineDialog.executeDialog('isReturn_table_info','信息','<i class="fa fa-question-circle fa-3x" style="color: #86CFF9;vertical-align:middle;"></i>　是否确定放弃当前录入信息？　　','100%','100%',
			function(){
    			history.go(-1);
			}
		);
    
}
