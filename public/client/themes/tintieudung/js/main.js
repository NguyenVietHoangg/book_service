﻿function showMenu(){var a=$(".btn-search"),t=$(".box-top-search"),e=$(".modal-backdrop");t.is(":visible")?(t.hide(),e.hide(),a.html('<i class="fa fa-search" aria-hidden="true"></i>')):(t.show(),$(".box-top-search input").focus(),e.show(),a.html('<i class="fa fa-times" aria-hidden="true"></i>'))}function OnEnter(a,t){if(!a)a=window.event;return!a||13!=a.keyCode||(a.cancelBubble=!0,a.returnValue=!1,a.cancel=!0,onSearch(t),!1)}function OpenSearch(a){var t="https://cse.google.com/cse?cx=006910404584765815108:3ppkdyhwmlh&ie=UTF-8&q="+a+"#gsc.tab=0&gsc.q="+a+"&gsc.page=1";window.open(t,"_blank").focus()}function onSearch(a){var t=$(".txt-search"+a).val();return""!=(t=encodeURIComponent(t))?OpenSearch(t):$(".txt-search"+a).focus(),!1}function onSearchMini(){var a=$("#txtKeyNews").val();return""!=(a=encodeURIComponent(a))&&OpenSearch(a),!1}function Tracking(){$("div[articleTracking=true]").each(function(){var a={tp:$(this).attr("tp"),randId:Math.floor(9999*Math.random())+100,ip:$(this).attr("ip"),cataId:$(this).attr("cataId"),id:$(this).attr("id")};try{PushTracking("https://imgkts.viettimes.vn/log.ashx",a)}catch(a){}})}function PushTracking(a,t){var e,o=[];for(var i in t)t.hasOwnProperty(i)&&(e=t[i],o[o.length]=i+"="+encodeURIComponent(e.toString()));var n="";o.length>0&&(n=o.join("&"));var s=jQuery('<img src="'+(""!=n?a+"?"+n:a)+'" style="display:none;width:0px;height:0px;" width="0" height="0" />');jQuery("body").append(s)}var showAlert=function(a,t){bootbox.alert(a,t)};function adv_l_f(){var a=$(".container").width(),t=$("#banner_l"),e=$(window).width(),o=e-(a+(e-a)/2+120+10);o>0?(t.css("left",o),t.show()):t.hide()}function adv_r_f(){var a=$(".container").width(),t=$("#banner_r"),e=$(window).width(),o=e-(a+(e-a)/2+120+10);o>0?(t.css("right",o),t.show()):t.hide()}$(document).mouseup(function(a){var t=$(".box-top-search");$(".btn-search .fa-times").is(a.target)||t.is(a.target)||0!==t.has(a.target).length||t.is(":visible")&&(t.hide(),$(".modal-backdrop").hide(),$(".btn-search").html('<i class="fa fa-search" aria-hidden="true"></i>'))});var searchInput=$("#txtKeyCom"),displayAutoComplete="#box-autocomplete";searchInput.on("input",function(){var a=searchInput.val();a.length>=1?($(displayAutoComplete).show(),getAutoComplete(a)):$(displayAutoComplete).hide()});var getAutoComplete=function(a){$.getJSON("/Handler/Load.ashx",{key:a,t:6}).done(function(a){if(console.log(a.data),null!=a.data&&a.data.length>0){for(var t="",e=0;e<a.data.length;e++)t+="      <tr>",t+='        <td><a href="'+a.data[e].Url+'">'+a.data[e].Symbol+" - "+a.data[e].Name+"</a></td>",t+="      </tr>";$(displayAutoComplete+" tbody").html(t)}})};$(document).mouseup(function(a){var t=$(displayAutoComplete);t.is(a.target)||0!==t.has(a.target).length||t.hide()});var calTool=function(){"ct"==$(".temp-radio .custom-control-input:checked").val()?($("#txtKeyNews").hide(),$("#txtKeyCom").show()):($("#txtKeyNews").show(),$("#txtKeyCom").hide())},numberWithCommas=function(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")};$(document).ready(function(){$(".temp-radio .custom-control-input").change(function(a){$(".temp-radio .custom-control-input").prop("checked",!1),$(this).prop("checked",!0),calTool()}),$(".search-mini button").click(function(){"tt"==$(".temp-radio .custom-control-input:checked").val()&&onSearchMini()}),$(".main-menu  li  a").each(function(a){$(this).attr("href")==catUrl&&$(this).parent().addClass("active")}),$("#cover-menu,.btn-search").click(function(a){a=window.event||a;showMenu(),a.stopPropagation()});try{$(".view9 .owl-carousel,.view11 .owl-carousel,.view12 .owl-carousel").owlCarousel({responsive:!0,items:3,margin:15,nav:!1,autoplay:!0,loop:!0,dot:!0,navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],autoplayTimeout:3e3,responsive:{0:{items:2,nav:!0},700:{items:2,nav:!1},1170:{items:3,nav:!0,loop:!1}}}),$(".view10 .owl-carousel").owlCarousel({responsive:!0,items:4,margin:15,nav:!1,autoplay:!0,loop:!0,dot:!0,navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],autoplayTimeout:3e3,responsive:{0:{items:2,nav:!0},700:{items:2,nav:!1},1170:{items:4,nav:!0,loop:!1}}}),$(".view3 .owl-carousel").owlCarousel({responsive:!0,items:5,margin:15,nav:!1,autoplay:!0,loop:!0,dot:!0,navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],autoplayTimeout:3e3,responsive:{0:{items:2,nav:!0},700:{items:3,nav:!1},1170:{items:5,nav:!0,loop:!1}}}),$(".mhightlight .owl-carousel").owlCarousel({responsive:!0,items:2,margin:15,nav:!1,autoplay:!0,loop:!0,dot:!0,navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],autoplayTimeout:3e3,responsive:{0:{items:2,nav:!0},700:{items:2,nav:!1},1170:{items:3,nav:!0,loop:!1}}}),$("#sliderGocNhin").owlCarousel({responsive:!0,items:1,margin:0,nav:!0,height:"auto",autoplay:!0,loop:!0,navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],autoplayTimeout:5e3}),$(".sliderSearch").owlCarousel({responsive:!0,items:4,margin:5,nav:!0,height:"auto",autoplay:!0,loop:!0,navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],autoplayTimeout:5e3})}catch(a){}var a=$("#back-to-top");a.click(function(){$("body,html").animate({scrollTop:0},500)}),$(window).scroll(function(){$(window).scrollTop()>100?a.removeClass("hide"):a.addClass("hide")}),Tracking()});