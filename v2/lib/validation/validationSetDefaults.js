define(['ff/validate_core'], function() {
	
	jQuery.validator.setDefaults({
		onfocusout: false,
		errorContainer: "#error_con",               //验证消息集中放置的容器
		errorLabelContainer: "#error_con ul",       //存放消息无序列表的容器
		// wrapper: "li",	                            //将验证消息用无序列表包围
		errorElement: "li",                         //验证标签的名称，默认为：label
		errorClass: "invalid",
		ignore: ""
	});

})