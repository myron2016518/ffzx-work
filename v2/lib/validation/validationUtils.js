define(['ff/dialog','ff/messages_zh','ff/validationSetDefaults','ff/additionalMethods'], function(){


    /**
     * 验证封装
     * id   设定from表单唯一标识。
     */
	  function executeValidateFrom(fid,getfunct,callfunction) {
		//console.log(fid);
		    $("#"+fid).validate({
	   	       submitHandler: function(form) {
				   console.log(fid);
		   	    	 var isTrue=true;
		   	    	if(getfunct==null || getfunct=="" || typeof(getfunct)=="undefined"){
		   	    		
		   	    	}else{
		   	    		var fn=eval(getfunct);
		   	    		isTrue=fn();
		   	    	}
	   	    	   if(isTrue){
	   	    		   //提交表单  
			   	    	var url=$('#'+fid).attr('action');
			   	    	var type=$('#'+fid).attr('method');
			   	    	if(callfunction==null || callfunction=="" || typeof(callfunction)=="undefined"){
				   	    	common_doSave(url,type,fid);
			   	    	}else{
			   	    		var clfn=eval(callfunction);
			   	    		var getdata =$('#'+fid).serialize();
			   	    		$.frontEngineAjax.executeAjax(url,type,getdata,clfn);
				   	    	//common_doSave(url,type,fid);
				   	    	/*setTimeout(function() {
				   	    		clfn();	
							}, 1000);*/
			   	    	}
				   	    
	   	    	   }
			     }
		    });
		 };

	return window.executeValidateFrom = executeValidateFrom;
})
		 
		
	
	




