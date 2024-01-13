//window.DOMAIN_IMG = 'http://localhost:8888'
var Demo = (function() {
	var urlMedia = '/admin/media'
	function output(node) {
		var existing = $('#result .croppie-result');
		if (existing.length > 0) {
			existing[0].parentNode.replaceChild(node, existing[0]);
		}
		else {
			$('#result')[0].appendChild(node);
		}
	}

	function processSlideImageAdd() {
		var blockImgList = $('#wrap-upload-'+window.idSaveAttachmenIdString+' .btn-img-view');
		var fistChild= blockImgList.find('.axz').first().clone();
		console.log('fistChild', fistChild);
		if (fistChild.length === 0) {
			alert(1); return;
		}
		fistChild.find(window.imgUploadId).attr('src', window.idSaveAttachmenIdTmpValue);
		blockImgList.append(fistChild);
		var inputImages = $(window.idSaveAttachmenId).val()
		if (!inputImages || inputImages === '') {
			inputImages = window.idSaveAttachmenIdTmpValue;
		} else {
			var blockImgList = $('.btn-img-view')
			inputImages = inputImages+','+window.idSaveAttachmenIdTmpValue;
		}
		$(window.idSaveAttachmenId).val(inputImages);
		console.log('listImages', inputImages);
	}

	function popupResult(result) {
		if (window.selecttab === 'myurl') {
			$('.loading-upload').show();
			setTimeout(() => {
        $.ajax({
					url: urlMedia + '/add',
					type: 'post',
					data: {
						src: $('#idUrl').val(),
						name: $('#idTitle').val(),
						is_watermark: $('#is_watermark').is(":checked") ? 'checked' : false,
						text_watermark: $('#text_watermark').val()
					},
					success: function(res) {
						$table.bootstrapTable('refresh');
						// window.idSaveAttachmenId.val($('#idUrl').val());
						// window.imgUploadId.attr('src', $('#idUrl').val());
						$('.tabtab').removeClass('active');
						$('.modal-upload').hide();
						$('#mylibrary').show();
						$('#idUrl').val('')
						$('#idTitle').val('');
						$('.wartermark-set').css({display: 'none'});
						$('.loading-upload').hide();
						$('#choose-mylibrary').addClass('active');
					}
				});
			}, 1500);
		} else if (window.selecttab === 'mylibrary') {
			$('.loading-upload').hide();
			if (window.idSaveAttachmenIdTmpValue == '') {
				$('.modal-upload-form').modal('toggle');
				return;
			}
			setTimeout(() => {
				var show_delete = window.open_delete ? 'open ': '';
				var blockImgList = $('#wrap-upload-'+idSaveAttachmenIdString+' .btn-img-view');
				if ($('#wrap-upload-'+idSaveAttachmenIdString+' .btn-img-view').find('.axz').length === 0) {
					var firstChild = '<span class="edit-region-image fa fa-unlock-alt" onclick="edit_region_image(this);"></span><div class="axz"><i class="icon-hihi '+show_delete+'fa fa-fw fa-remove" onclick="onclick_remove_image();"></i><a href="'+window.idSaveAttachmenIdTmpValue+'" target="_blank" class="img-colorbox href-img-upload-avatar3 cboxElement"><img src="'+window.idSaveAttachmenIdTmpValue+'" style="width: 96px; height: 96px; margin: 15px;" "="" class=""></a></div>';
				} else {
					var firstChild = '</span><div class="axz"><i class="icon-hihi '+show_delete+'fa fa-fw fa-remove" onclick="onclick_remove_image();"></i><a href="'+window.idSaveAttachmenIdTmpValue+'" target="_blank" class="img-colorbox href-img-upload-avatar3 cboxElement"><img src="'+window.idSaveAttachmenIdTmpValue+'" style="width: 96px; height: 96px; margin: 15px;" "="" class=""></a></div>';
				}

				var multipleImg = window.multipleImg
				if (window.multipleImg) {
					blockImgList.append(firstChild);
					var inputImages = $(window.idSaveAttachmenId).val();
					console.log('inputImages', inputImages);
					if (!inputImages || inputImages === '') {
						inputImages = window.idSaveAttachmenIdTmpValue;
					} else {
						console.log('vao day', inputImages);
						var blockImgList = $('.btn-img-view');
						inputImages = inputImages+','+window.idSaveAttachmenIdTmpValue;
					}
					$(window.idSaveAttachmenId).val(inputImages.replace(window.DOMAIN_IMG, ''));
					console.log('listImages', inputImages.replace(window.DOMAIN_IMG, ''));
				} else {
					blockImgList.html(firstChild);
					$(window.idSaveAttachmenId).val((window.idSaveAttachmenIdTmpValue).replace(window.DOMAIN_IMG, ''));
					window.imgUploadId.attr('src', window.idSaveAttachmenIdTmpValue);
					window.hrefUploadId.attr('href', window.idSaveAttachmenIdTmpValue);
				}
				$('.img-cus').removeClass('selected-img');
				$('.img-cus-input').removeClass('selected-img');
				$('.modal-upload-form').modal('toggle');
				// $.getScript('/admin/myscript/js/plugin-upload.js');
				window.multipleImg = multipleImg;
				if ($('#wrap-upload-'+idSaveAttachmenIdString+' .btn-img-view').find('.axz').length === 0) {
					$('#'+window.idSaveAttachmenIdString+ ' .btn-img-view').css({display: 'none'});
				} else {
					$('#wrap-upload-'+idSaveAttachmenIdString+' .btn-img-view').css({display: 'block'});
				}
				$.getScript('/admin/plugins/Croppie-2.6.4/demo/demo.js');
			}, 200);
		} else {
			var html;
			if (result.html) {
				html = result.html;
			}
			if (result.src) {
				html = '<img id="response-base-64-img" src="' + result.src + '" style="display:none;" />';
			}
			var crop_enable = $('input#crop_enable').is(':checked');
			$('.base-64-img-set').html(html);
			if (crop_enable) {
				$('#upload-demo').show();
			} else {
				$('#upload-demo').hide();
			}
			$('.loading-upload').show();
			$('.upload-result').hide();
			setTimeout(function() {
				if (!crop_enable) {
					console.log('this upload_imediate');
					var file_data = $('.file-modal-upload').prop('files')[0];   
					if (!file_data) {
						$('.loading-upload').hide();
						$('.upload-result').show();
						return;
					}
					var form_data = new FormData();                  
					form_data.append('file', file_data);
					$.ajax({
							data: form_data,
							type: "POST",
							url: "/admin/media/add?type=form",
							cache: false,
							contentType: false,
							processData: false,
							beforeSend: function (res) {
							},
							success: function(res) {
								window.idSaveAttachmenIdTmpValue = ''
								$table.bootstrapTable('refresh');
								$('#idNameUpload').val('');
								// window.idSaveAttachmenId.val(res.url);
								window.selecttab = 'mylibrary';
								$('.tabtab').removeClass('active');
								$('#choose-mylibrary').addClass('active');
								
								// $('.tabtab').removeClass('active');
								// $(this).addClass('active');
								// $("#load-more-image").show();
								$('.modal-upload').hide();
								$('#mylibrary').show();
								$('.wartermark-set').css({display: 'none'});
								reloadData();
							},
							error: function(res) {
								$('.loading-upload').hide();
								$('.upload-result').show();
								$('#choose-mylibrary').addClass('active');
							}, complete: function (res) {
								$('.loading-upload').hide();
								$('.upload-result').show();
								$('#choose-mylibrary').addClass('active');
							}
					});
				} else {
					console.log('this crop_enable');
					var myImg = document.querySelector("#response-base-64-img");
					var fileName =$('#idNameUpload').val();
					$('.loading-upload').show();
					$('.upload-result').hide();
						$.ajax({
							url: urlMedia + '/add',
							type: 'post',
							data: {
								encode64img: result.src,
								name: fileName,
								width: myImg.naturalWidth,
								height: myImg.naturalHeight,
								is_watermark: $('#is_watermark').is(":checked") ? 'checked' : false,
								text_watermark: $('#text_watermark').val()
							},
							beforeSend: function (res) {
								
							},
							success: function(res) {
								window.idSaveAttachmenIdTmpValue = ''
								$table.bootstrapTable('refresh');
								$('#idNameUpload').val('');
								// window.idSaveAttachmenId.val(res.url);
								window.selecttab = 'mylibrary';
								$('.tabtab').removeClass('active');
								$('#choose-mylibrary').addClass('active');
								
								// $('.tabtab').removeClass('active');
								// $(this).addClass('active');
								// $("#load-more-image").show();
								$('.modal-upload').hide();
								$('#mylibrary').show();
								$('.wartermark-set').css({display: 'none'});
								reloadData();
								// window.imgUploadId.attr('src', result.src);
								// $('.modal-upload-form').modal('toggle');
							},
							error: function(res) {
								$('.loading-upload').hide();
								$('.upload-result').show();
								$('#choose-mylibrary').addClass('active');
							},
							complete: function(res) {
								$('.loading-upload').hide();
								$('.upload-result').show();
								$('#choose-mylibrary').addClass('active');
							}
						});
				}
				}, 1500);
			return;
			swal({
				title: 'Bạn có chắc chắn upload ảnh không?',
				html: true,
				text: html,
				allowOutsideClick: false,
				// showCancelButton: true,
				showLoaderOnConfirm: false,
				onOpen: function (){
					swal.disableConfirmButton();
				}
			}, function() {
				var myImg = document.querySelector("#response-base-64-img");
				var fileName =$('#idNameUpload').val();
				$.ajax({
					url: urlMedia + '/add',
					type: 'post',
					data: {
						encode64img: result.src,
						name: fileName,
						width: myImg.naturalWidth,
						height: myImg.naturalHeight
					},
					success: function(res) {
						$table.bootstrapTable('refresh');
						$('#idNameUpload').val('');
						// window.idSaveAttachmenId.val(res.url);
						window.selecttab = 'mylibrary';
						$('.tabtab').removeClass('active');
						$('#choose-mylibrary').addClass('active');
						
						// $('.tabtab').removeClass('active');
						// $(this).addClass('active');
						// $("#load-more-image").show();
						$('.modal-upload').hide();
						$('#mylibrary').show();
						reloadData();
						// window.imgUploadId.attr('src', result.src);
						// $('.modal-upload-form').modal('toggle');
					},
					complete: function(res) {

					}
				});
			});
		}
	}

	function demoMain () {
		var mc = $('#cropper-1');
		mc.croppie({
			viewport: {
				width: 150,
				height: 150,
				type: 'circle'
			},
			boundary: {
				width: 300,
				height: 300
			},
			// url: 'demo/demo-1.jpg',
			// enforceBoundary: false
			// mouseWheelZoom: false
		});
		mc.on('update.croppie', function (ev, data) {
			// console.log('jquery update', ev, data);
		});
		$('.js-main-image').on('click', function (ev) {
            mc.croppie('result', {
				type: 'rawcanvas',
				circle: true,
				// size: { width: 300, height: 300 },
            	format: 'png'
            }).then(function (canvas) {
				popupResult({
					src: canvas.toDataURL()
				});
			});
		});
	}

	function demoBasic() {
		var $w = $('.basic-width'),
			$h = $('.basic-height'),
			basic = $('#demo-basic').croppie({
			viewport: {
				width: 150,
				height: 200
			},
			boundary: {
				width: 300,
				height: 300
			}
		});
		basic.croppie('bind', {
			url: 'demo/cat.jpg',
			points: [77,469,280,739]
		});

		$('.basic-result').on('click', function() {
			var w = parseInt($w.val(), 10),
				h = parseInt($h.val(), 10),s
				size = 'viewport';
			if (w || h) {
				size = { width: w, height: h };
			}
			basic.croppie('result', {
				type: 'canvas',
				size: size,
				resultSize: {
					width: 50,
					height: 50
				}
			}).then(function (resp) {
				popupResult({
					src: resp
				});
			});
		});
	}

	function demoVanilla() {
		var vEl = document.getElementById('vanilla-demo'),
			vanilla = new Croppie(vEl, {
			viewport: { width: 200, height: 100 },
			boundary: { width: 300, height: 300 },
			showZoomer: false,
            enableOrientation: true
		});
		vanilla.bind({
            url: 'demo/demo-2.jpg',
            orientation: 4,
            zoom: 0
        });
        vEl.addEventListener('update', function (ev) {
        	// console.log('vanilla update', ev);
        });
		document.querySelector('.vanilla-result').addEventListener('click', function (ev) {
			vanilla.result({
				type: 'blob'
			}).then(function (blob) {
				popupResult({
					src: window.URL.createObjectURL(blob)
				});
			});
		});

		$('.vanilla-rotate').on('click', function(ev) {
			vanilla.rotate(parseInt($(this).data('deg')));
		});
	}

    function demoResizer() {
		var vEl = document.getElementById('resizer-demo'),
			resize = new Croppie(vEl, {
			viewport: { width: 100, height: 100 },
			boundary: { width: 300, height: 300 },
			showZoomer: false,
            enableResize: true,
            enableOrientation: true,
            mouseWheelZoom: 'ctrl'
		});
		resize.bind({
            url: 'demo/demo-2.jpg',
            zoom: 0
        });
        vEl.addEventListener('update', function (ev) {
        	console.log('resize update', ev);
        });
		document.querySelector('.resizer-result').addEventListener('click', function (ev) {
			resize.result({
				type: 'blob'
			}).then(function (blob) {
				popupResult({
					src: window.URL.createObjectURL(blob)
				});
			});
		});
	}
	var $idSelector=null;
	function demoUpload(idSelector='') {
		var $uploadCrop;
		$idSelector =$('#'+idSelector);

		function readFile(input) {
 			if (input.files && input.files[0]) {
	            var reader = new FileReader();
	            
	            reader.onload = function (e) {
					$('.upload-demo').addClass('ready');
	            	$uploadCrop.croppie('bind', {
	            		url: e.target.result
	            	}).then(function(){
									console.log('jQuery bind complete');
									$('.title-file').text(input.files[0].name);
	            	});
	            	
	            }
	            
	            reader.readAsDataURL(input.files[0]);
	        }
	        else {
		        swal("Sorry - you're browser doesn't support the FileReader API");
		    }
		}

		$uploadCrop = $('#upload-demo').croppie({
			enableExif: true,
			viewport: {
					width: 200,
					height: 200,
					type: 'cavans',
			},
			boundary: {
					width: 480,
					height: 320
			},
			enableResize: true
	});

		$('#upload').on('change', function () { readFile(this); });
		$('.upload-result').on('click', function (ev) {
			$uploadCrop.croppie('result', {
				type: 'canvas',
				// size: 'viewport',
				size: 'original',
				quality: 1
			}).then(function (resp) {
				console.log('hihihi', resp);
				popupResult({
					src: resp
				});
			});
		});
	}

	function demoHidden() {
		var $hid = $('#hidden-demo');

		$hid.croppie({
			viewport: {
				width: 175,
				height: 175,
				type: 'circle'
			},
			boundary: {
				width: 200,
				height: 200
			}
		});
		$hid.croppie('bind', 'demo/demo-3.jpg');
		$('.show-hidden').on('click', function () {
			$hid.toggle();
			$hid.croppie('bind');
		});
	}

	function bindNavigation () {
		var $html = $('html');
		$('nav a').on('click', function (ev) {
			var lnk = $(ev.currentTarget),
				href = lnk.attr('href'),
				targetTop = $('a[name=' + href.substring(1) + ']').offset().top;

			$html.animate({ scrollTop: targetTop });
			ev.preventDefault();
		});
	}

	function init() {
		bindNavigation();
		// demoMain();
		// demoBasic();	
		// demoVanilla();	
		// demoResizer();
		demoUpload('avatar');
		// demoHidden();
	}

	return {
		init: init
	};
})();


// Full version of `log` that:
//  * Prevents errors on console methods when no console present.
//  * Exposes a global 'log' function that preserves line numbering and formatting.
(function () {
  var method;
  var noop = function () { };
  var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});
 
  while (length--) {
    method = methods[length];
 
    // Only stub undefined methods.
    if (!console[method]) {
        console[method] = noop;
    }
  }
 
 
  if (Function.prototype.bind) {
    window.log = Function.prototype.bind.call(console.log, console);
  }
  else {
    window.log = function() { 
      Function.prototype.apply.call(console.log, console, arguments);
    };
  }
})();

$(function() {
	$('.icon-hihi').click(function() {
		// làm lại link input
		var linkx = $(this).parent('.axz').find('img').attr('src');
		if (window.multipleImg) {
			linkx = linkx.replace(window	.DOMAIN_IMG, '');
			var inputImages = $(window.idSaveAttachmenId).val();
			if (inputImages && inputImages.trim() != '') {
				var arr = inputImages.split(',');
				var newArr = [];
				var newString = '';
				for(var i = 0; i < arr.length; i++) {
					if (arr[i].trim() != '' && arr[i].trim() !== linkx.trim()) {
						newArr.push(arr[i]);
					}
				}
				if (newArr.length) {
					newString = newArr.join(',');
				}
			}
			console.log('xx', linkx, newArr);
			$(window.idSaveAttachmenId).val(newString);
		} else {
			console.log('y');
			$(window.idSaveAttachmenId).val("")
		}
		$(this).parent('.axz').remove();
		if ($('#wrap-upload-'+idSaveAttachmenIdString+' .btn-img-view').find('.axz').length === 0) {
			$('#wrap-upload-'+idSaveAttachmenIdString+' .btn-img-view').css({display: 'none'});
		} else {
			$('#wrap-upload-'+idSaveAttachmenIdString+' .btn-img-view').css({display: 'block'});
		}
		if ($('#form_data').find('.axz').length === 0) {
			$('.btn-img-view').css({display: 'none'});
		}
	});
	// sử dụng gọi CROP FX
	$(document).on('eventhandler', function() { 
		$table.bootstrapTable('refresh');
		// window.idSaveAttachmenId.val($('#idUrl').val());
		// window.imgUploadId.attr('src', $('#idUrl').val());
		$('.tabtab').removeClass('active');
		$('.modal-upload').hide();
		$('#mylibrary').show();
		$('#idUrl').val('')
		$('#idTitle').val('');
		$('.wartermark-set').css({display: 'none'});
		$('.loading-upload').hide();
		$('#choose-mylibrary').addClass('active');
		window.selecttab = 'mylibrary'
	});
});

