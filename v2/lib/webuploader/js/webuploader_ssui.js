define(['ff/webuploader_core'], function(WebUploader) {
	
	var func_upload = function(obj){
		
		if (typeof obj.list == 'undefined' || $(obj.list).length == 0) {
			
			alert('亲，请定义列表容器！');
			return false;
		}
		
		if (typeof obj.callback == 'undefined') {
			obj.callback = {};
		}
		
		var type = obj.type || 'file', // type: image, file(default)
			state = 'pending',
			$list = $(obj.list),
			
			// 优化retina, 在retina下这个值是2
			ratio = window.devicePixelRatio || 1,

			// 缩略图大小
			thumbnailWidth = 100 * ratio,
			thumbnailHeight = 100 * ratio,

			// Web Uploader实例
			uploader;

		// 初始化Web Uploader
		uploader = WebUploader.create($.extend({}, OPT_WEBUPLOADER, obj || {}));
		
		// Callbacks for uploading images
		if (type == 'image') {
			
			// 当有文件添加进来之前
			uploader.on( 'beforeFileQueued', function( file ) {

				if ($.isFunction(obj.callback.beforeFileQueued)) {
					obj.callback.beforeFileQueued(file);
				}
			});
			
			// 当有文件添加进来的时候
			uploader.on( 'fileQueued', function( file ) {
				var $li = $(
						'<div id="' + file.id + '" class="file-item thumbnail">' +
							'<img>' +
							'<a href="javascript:void(0);" class="remove-img"><i class="fa fa-times" aria-hidden="true"></i></a>' +
							'<div class="info">' + file.name + '</div>' +
						'</div>'
						),
					$img = $li.find('img');

				$list.append( $li );
				
				$li.find('.remove-img').on('click', function(){					
					
					if ($.isFunction(obj.callback.fileDeleted)) {
						obj.callback.fileDeleted(file);
					}
					
					uploader.removeFile(file.id, true);
					$li.remove();
				});

				// 创建缩略图
				uploader.makeThumb( file, function( error, src ) {
					if ( error ) {
						$img.replaceWith('<span>不能预览</span>');
						return;
					}

					$img.attr( 'src', src );
				}, thumbnailWidth, thumbnailHeight );
				
				if ($.isFunction(obj.callback.fileQueued)) {
					obj.callback.fileQueued(file);
				}
			});
			
			// 当一批文件添加进来的时候
			uploader.on( 'filesQueued', function( files ) {
				
				if ($.isFunction(obj.callback.filesQueued)) {
					obj.callback.filesQueued(files);
				}
			});

			// 文件上传过程中创建进度条实时显示。
			uploader.on( 'uploadProgress', function( file, percentage ) {
				var $li = $( '#'+file.id ),
					$percent = $li.find('.progress span');

				// 避免重复创建
				if ( !$percent.length ) {
					$percent = $('<p class="progress"><span></span></p>')
							.appendTo( $li )
							.find('span');
				}

				$percent.css( 'width', percentage * 100 + '%' );
				
				if ($.isFunction(obj.callback.uploadProgress)) {
					obj.callback.uploadProgress(file, percentage);
				}
			});

			// 文件上传成功，给item添加成功class, 用样式标记上传成功。
			uploader.on( 'uploadSuccess', function( file, response ) {
				$( '#'+file.id ).addClass('upload-state-done');
				
				if ($.isFunction(obj.callback.uploadSuccess)) {
					obj.callback.uploadSuccess(file, response);
				}
			});

			// 文件上传失败，现实上传出错。
			uploader.on( 'uploadError', function( file, reason ) {
				var $li = $( '#'+file.id ),
					$error = $li.find('div.error');

				// 避免重复创建
				if ( !$error.length ) {
					$error = $('<div class="error"></div>').appendTo( $li );
				}

				$error.text('上传失败');
				$error.append('<br />' + file.name + ': ' + reason);
				
				if ($.isFunction(obj.callback.uploadError)) {
					obj.callback.uploadError(file, reason);
				}
			});

			// 完成上传完了，成功或者失败，先删除进度条。
			uploader.on( 'uploadComplete', function( file ) {
				$( '#'+file.id ).find('.progress').remove();
				
				if ($.isFunction(obj.callback.uploadComplete)) {
					obj.callback.uploadComplete(file);
				}
			});
			
			uploader.on('uploadFinished', function(){
				
				if ($.isFunction(obj.callback.uploadFinished)) {
					obj.callback.uploadFinished();
				}
			});		
		}
		
		// Callbacks for uploading files
		if (type == 'file') {
			
			// 当有文件添加进来之前
			uploader.on( 'beforeFileQueued', function( file ) {

				if ($.isFunction(obj.callback.beforeFileQueued)) {
					obj.callback.beforeFileQueued(file);
				}
			});
			
			// 当有文件添加进来的时候
			uploader.on( 'fileQueued', function( file ) {
				var $li = $('<div id="' + file.id + '" class="item">' +
					'<h4 class="info">' + file.name + '<a href="javascript:void(0);" class="remove-file"><i class="fa fa-times" aria-hidden="true"></i></a></h4>' +
					'<p class="state">等待上传...</p>' +
				'</div>');
				
				$li.find('.remove-file').on('click', function(){					
					
					if ($.isFunction(obj.callback.fileDeleted)) {
						obj.callback.fileDeleted(file);
					}
					
					uploader.removeFile(file.id, true);
					$li.remove();
				});
				
				$list.append( $li );
				
				if ($.isFunction(obj.callback.fileQueued)) {
					obj.callback.fileQueued(file);
				}
			});

			// 当一批文件添加进来的时候
			uploader.on( 'filesQueued', function( files ) {
				
				if ($.isFunction(obj.callback.filesQueued)) {
					obj.callback.filesQueued(files);
				}
			});
			
			// 文件上传过程中创建进度条实时显示。
			uploader.on( 'uploadProgress', function( file, percentage ) {
				var $li = $( '#'+file.id ),
					$percent = $li.find('.progress .progress-bar');

				// 避免重复创建
				if ( !$percent.length ) {
					$percent = $('<div class="progress progress-striped active">' +
					  '<div class="progress-bar" role="progressbar" style="width: 0%">' +
					  '</div>' +
					'</div>').appendTo( $li ).find('.progress-bar');
				}

				$li.find('p.state').text('上传中');

				$percent.css( 'width', percentage * 100 + '%' );
				
				if ($.isFunction(obj.callback.uploadProgress)) {
					obj.callback.uploadProgress(file, percentage);
				}
			});

			uploader.on( 'uploadSuccess', function( file, response ) {
				$( '#'+file.id ).find('p.state').text('上传成功').end()
					.find('.remove-file').show();
				
				if ($.isFunction(obj.callback.uploadSuccess)) {
					obj.callback.uploadSuccess(file, response);
				}
			});

			uploader.on( 'uploadError', function( file, reason ) {
				$( '#'+file.id ).find('p.state').text('上传出错');
				
				if ($.isFunction(obj.callback.uploadError)) {
					obj.callback.uploadError(file, reason);
				}
			});

			uploader.on( 'uploadComplete', function( file ) {
				$( '#'+file.id ).find('.progress').fadeOut();
				
				if ($.isFunction(obj.callback.uploadComplete)) {
					obj.callback.uploadComplete(file);
				}
			});

			uploader.on( 'all', function( type ) {
				if ( type === 'startUpload' ) {
					state = 'uploading';
				} else if ( type === 'stopUpload' ) {
					state = 'paused';
				} else if ( type === 'uploadFinished' ) {
					state = 'done';
				}
				
				/*
				if ( state === 'uploading' ) {
					$btn.text('暂停上传');
				} else {
					$btn.text('开始上传');
				}
				*/
			});

			/*
			$btn.on( 'click', function() {
				if ( state === 'uploading' ) {
					uploader.stop();
				} else {
					uploader.upload();
				}
			});
			*/
		}
		
		func_upload.instance = uploader;
	};
	
	return func_upload;
});