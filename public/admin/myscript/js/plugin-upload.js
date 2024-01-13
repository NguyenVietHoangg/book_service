/**
 * Onclick upload
 * Author : ndhung.dev@gmail.com
 * Date : 25/05/2020
 */
//window.DOMAIN_IMG = 'http://localhost:8888'
var base_url = '';
var onUpload = $('#upload-immediate');
var formId = '';
var $idSaveUrl = null;
var $idSaveUrlTmp = $('#id-save-url-tmp');
var $idSaveAttachmenId = null;
var $idSaveAttachmenIdTmp = $('#id-save-attachment-id-tmp');
var uploadName = null;
var uploadNameTmp = null;
var formModalUpload = $('.form-modal-upload');
var classInputUpload = $('.upload-file-data');
var modalUploadForm = $('.modal-upload-form');
var applyUpload = $('#apply-upload');
var multiple = null;
var page = 1;
var $returnOnCallback = null;
var imageId = null;
var changeTabToLibrary = false;
var $dimension = null;
var styleimage32 = "style='width: 32px; position: absolute; left: 123px; top: 1px;'";
var styleimagecompact32 = "style='width: 32px; position: absolute; left: 30px; top: 1px;'";
var styleimage96 = "style='width: 96px; height: 96px; margin: 15px;'";
var routerUpload = '/admin'
window.selecttab = 'mylibrary';
window.multipleImg = false;


/**
 * [initUploadAws description]
 * @param  {String} uploadName          filename input on form
 * @param  {String} idSaveUrl         ID will save URL image on html
 * @param  {String} idSaveAttachmenId ID will save IId attachment
 * @param  {String} returnOnCallback     Boolean
 * @return {jsonencode}                data result json
 * --------------------------------------------------------------------
 * Author : ndhung.dev@gmail.com
 * Date : 25/05/2016
 */
var initUploadAws = function (idSaveAttachmenId = '', data = {
	open: true,
	reload: false,
	src: ''
}, multipleImg = false) {
	// show crop
	var crop_enable = $('input#crop_enable').is(':checked');
	if (crop_enable) {
		$('#upload-demo').show();
	} else {
		$('#upload-demo').hide();
	}

	window.multipleImg = multipleImg || false;
	window.idSaveAttachmenIdTmpValue = '';
	window.selecttab = 'mylibrary';
	$('#searchimg').val('');
	$('.tabtab').removeClass('active');
	$('#choose-mylibrary').addClass('active');
	window.wrapUpload = $('#wrap-upload-' + idSaveAttachmenId);
	window.idSaveAttachmenIdString = idSaveAttachmenId;
	window.idSaveAttachmenId = $('#' + idSaveAttachmenId);
	window.imgUploadId = $('#img-upload-' + idSaveAttachmenId);
	window.hrefUploadId = $('.href-img-upload-' + idSaveAttachmenId);
	let style = styleimage96;
	if (!data || data === '') {
		data = {
			open: true,
			reload: false,
			src: ''
		}
	}
	if (data.style === 32)
		style = styleimage32;
	if (data.style === 321)
		style = styleimagecompact32;
	if ($('#' + idSaveAttachmenId).length === 0) {
		$('#render-' + idSaveAttachmenId).append('<input class="form-control" id="' + idSaveAttachmenId + '" name="' + idSaveAttachmenId + '" value="' + data.src + '" type="hidden">');
		if (window.multipleImg) {
			if (!data.src || data.src === '') {
				$('#wrap-upload-' + idSaveAttachmenId).append(
					'<div class="col-md-10"><div class="box-body"><div class="btn-img-view"><span class="edit-region-image fa fa-unlock-alt" onclick="edit_region_image(this);"></span></div></div></div>'
				);
			} else {
				var listImages = data.src.split(',');
				for (var i = 0; i < listImages.length; i++) {
					if (i === 0) {
						$('#wrap-upload-' + idSaveAttachmenId).append(
							'<div class="col-md-10"><div class="box-body"><div class="btn-img-view"><span class="edit-region-image fa fa-unlock-alt" onclick="edit_region_image(this);"></span><div class="axz"><i class="icon-hihi fa fa-fw fa-remove" onclick="onclick_remove_image();"></i><a href="' + window.DOMAIN_IMG + listImages[i] + '" target="_blank" class="img-colorbox href-img-upload-' + idSaveAttachmenId + '_list_' + i + '"><img src="' + window.DOMAIN_IMG + listImages[i] + '" ' + style + '" class=""/></a></div></div></div></div>'
						);
					} else {
						var blockImgList = $('#wrap-upload-' + idSaveAttachmenId + ' .btn-img-view');
						var fistChild = blockImgList.find('.axz').first().clone();
						fistChild.find('img').attr('src', window.DOMAIN_IMG+listImages[i]);
						fistChild.find('a.img-colorbox').attr('href', window.DOMAIN_IMG+listImages[i]);
						console.log('firstChild', fistChild);
						blockImgList.append(fistChild);
					}
				}
			}
		} else {
			if (data.src && data.src.trim() != '') {
				$('#wrap-upload-' + idSaveAttachmenId).append(
					'<div class="col-md-2"><div class="box-body"><div class="btn-img-view"><span class="edit-region-image fa fa-unlock-alt" onclick="edit_region_image(this);"></span><div class="axz"><i class="icon-hihi fa fa-fw fa-remove" onclick="onclick_remove_image();"></i><a href="' + window.DOMAIN_IMG + data.src + '" target="_blank" class="img-colorbox href-img-upload-' + idSaveAttachmenId + '"><img src="' + window.DOMAIN_IMG + data.src + '" ' + style + '" class=""/></a></div></div></div></div>'
				);
			} else {
				$('#wrap-upload-' + idSaveAttachmenId).append(
					'<div class="col-md-2"><div class="box-body"><div class="btn-img-view"><span class="edit-region-image fa fa-unlock-alt" onclick="edit_region_image(this);"></span></div></div></div>'
				);
			}
		}
		window.idSaveAttachmenId = $('#' + idSaveAttachmenId);
		window.imgUploadId = $('#img-upload-' + idSaveAttachmenId);
	}
	if ($('#wrap-upload-' + idSaveAttachmenIdString + ' .btn-img-view').find('.axz').length === 0) {
		$('#wrap-upload-' + idSaveAttachmenIdString + ' .btn-img-view').css({
			display: 'none'
		});
	} else {
		$('#wrap-upload-' + idSaveAttachmenIdString + ' .btn-img-view').css({
			display: 'block'
		});
	}
	if (data.open) {
		reloadData();
		$('.modal-upload').hide();
		$('#mylibrary').show();
		$('.wartermark-set').css({"display": 'none'});
		modalUploadForm.modal('toggle');
		// $('#wrap-upload').modal('toggle');
	}
};

/**
 * [reloadData description]
 * --------------------------------------------------------------------
 * Author : ndhung.dev@gmail.com
 * Date : 25/05/2016
 */
var reloadData = function () {
	initTable({
		onlyImage: true
	});
}

$('#choose-mycomputer').click(function (e) {
	window.idSaveAttachmenIdTmpValue = '';
	window.selecttab = 'mycomputer';
	$('.tabtab').removeClass('active');
	$(this).addClass('active');
	$("#load-more-image").hide();
	$('.modal-upload').hide();
	$('#mycomputer').show().css("height", "100%");
	$('.wartermark-set').css({display: 'block'});
});

$('#choose-mylibrary').click(function (e) {
	window.idSaveAttachmenIdTmpValue = '';
	window.selecttab = 'mylibrary';
	$('.tabtab').removeClass('active');
	$(this).addClass('active');
	$("#load-more-image").show();
	$('.modal-upload').hide();
	$('#mylibrary').show();
	$('.wartermark-set').css({display: 'none'});
	$table.bootstrapTable('refresh');
	reloadData();
});

$('#choose-myurl').click(function (e) {
	window.idSaveAttachmenIdTmpValue = '';
	window.selecttab = 'myurl';
	$('.tabtab').removeClass('active');
	$(this).addClass('active');
	$("#load-more-image").hide();
	$('.modal-upload').hide();
	$('#myurl').show().css("height", "100%");
	$('.wartermark-set').css({display: 'block'});
	var crop_enable = $('input#crop_enable').is(':checked');
	if (crop_enable) {
		$('#upload-demo').show();
	} else {
		$('#upload-demo').hide();
	}
});

$('#choose-cropfx').click(function (e) {
	window.idSaveAttachmenIdTmpValue = '';
	window.selecttab = 'cropfx';
	$('.tabtab').removeClass('active');
	$(this).addClass('active');
	$("#load-more-image").hide();
	$('.modal-upload').hide();
	$('.wartermark-set').css({display: 'none'});
	$('#cropfx').show();
});

var onclickImage = function (id, src) {
	imageId = id;
	$('.img-cus').removeClass('selected-img');
	$('.img-cus-input').removeClass('selected-img');
	$("#img-cus-" + id).addClass('selected-img');
	$("#img-cus-input" + id).addClass('selected-img');
	window.idSaveAttachmenIdTmpValue = src;
	window.imageId.Tmp = src;
}

/**
 * Load more Image
 * Author : ndhung.dev@gmail.com
 * Date : 25/05/2016
 */
var loadMoreImage = function () {
	page++;
	$.ajax({
		url: routerUpload + '/ajax-list?offset=' + page * 30,
		type: 'POST',
		data: {},
		beforeSend: function () {

		},
		success: function (res) {
			if (res == 1) {
				$('#load-more-image').hide();
				page = 1;
				return;
			}
			$('#mylibrary').append(res);
		}
	});
}

var getPageImages = function (params) {
	var type = $('#type_writer').val();
	$.ajax({
		url: base_url + params,
		type: 'get',
		success: function (data) {
			$('#mylibrary').html(data);
		}
	});
}

$('.set-watermark').click(function (e) {
	if ($(this).is(':checked')) {
		var isCheckedWatermark = 'on';
	} else {
		var isCheckedWatermark = 'off';
	}
	$.ajax({
		url: routerUpload + '/add?is_mark=' + isCheckedWatermark,
		type: 'GET',
		beforeSend: function () {},
		success: function (res) {}
	});
});

window.open_delete = false;
function edit_region_image() {
	if (window.open_delete) {
		$(".icon-hihi").removeClass('open');
	} else {
		$(".icon-hihi").addClass('open');
	}
	window.open_delete = !window.open_delete;
}

function onclick_remove_image() {
	// $(this).parent('.axz').remove();
}