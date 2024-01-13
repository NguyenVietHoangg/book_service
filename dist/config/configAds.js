"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageDimention = exports.ads = exports.Dimention = void 0;
var ads = exports.ads = [{
  type: 'Home',
  name: 'Trang Chủ',
  value: 1,
  list_position: [{
    type: 'pc_dinh_dau',
    name: 'Trang chủ PC - Đỉnh đầu',
    parent: 'Home|pc_dinh_dau',
    value: 1,
    allowDimension: ['728x90', '250x300']
  }, {
    type: 'pc_duoi_tieu_diem',
    name: 'Trang chủ PC - Dưới tiêu điểm',
    parent: 'Home|pc_duoi_tieu_diem',
    value: 2,
    allowDimension: ['300x250']
  }, {
    type: 'pc_duoi_xem_nhieu',
    name: 'Trang chủ PC - Dưới xem nhiều',
    parent: 'Home|pc_duoi_xem_nhieu',
    value: 3,
    allowDimension: ['300x250']
  }, {
    type: 'pc_duoi_moi_nhat',
    name: 'Trang chủ PC - Dưới mới nhất',
    parent: 'Home|pc_duoi_moi_nhat',
    value: 4,
    allowDimension: ['800x350']
  }, {
    type: 'pc_duoi_ti_gia',
    name: 'Trang chủ PC - Dưới tỉ giá',
    parent: 'Home|pc_duoi_ti_gia',
    value: 5,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_phai_giua_trang',
    name: 'Trang chủ PC - Bên phải giữa trang',
    parent: 'Home|pc_ben_phai_giua_trang',
    value: 6,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_trai_giua_trang',
    name: 'Trang chủ PC - Bên trái giữa trang',
    parent: 'Home|pc_ben_trai_giua_trang',
    value: 7,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_phai_cuoi_trang',
    name: 'Trang chủ PC - Bên phải cuối trang',
    parent: 'Home|pc_ben_phai_cuoi_trang',
    value: 8,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_trai_cuoi_trang',
    name: 'Trang chủ PC - Bên trái cuối trang',
    parent: 'Home|pc_ben_trai_cuoi_trang',
    value: 9,
    allowDimension: ['300x250']
  }, {
    type: 'pc_cuoi_trang',
    name: 'Trang chủ PC - Cuối trang',
    parent: 'Home|pc_cuoi_trang',
    value: 10,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_dinh_dau',
    name: 'Trang chủ Mobile - Đỉnh đầu',
    parent: 'Home|mobile_dinh_dau',
    value: 11,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_duoi_tin_moi_nhat',
    name: 'Trang chủ Mobile - Dưới tin mới nhất',
    parent: 'Home|mobile_duoi_tin_moi_nhat',
    value: 12,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_cuoi_trang',
    name: 'Trang chủ Mobile - Cuối trang',
    parent: 'Home|mobile_cuoi_trang',
    value: 13,
    allowDimension: ['300x250']
  }]
}, {
  type: 'Category',
  name: 'Chi tiết Danh Mục',
  value: 1,
  list_position: [{
    type: 'pc_dinh_dau',
    name: 'Danh mục PC - Đỉnh đầu',
    parent: 'Category|pc_dinh_dau',
    value: 1,
    allowDimension: ['728x90', '250x300']
  }, {
    type: 'pc_duoi_tieu_diem',
    name: 'Danh mục PC - Dưới tiêu điểm',
    parent: 'Category|pc_duoi_tieu_diem',
    value: 2,
    allowDimension: ['300x250']
  }, {
    type: 'pc_duoi_xem_nhieu',
    name: 'Danh mục PC - Dưới xem nhiều',
    parent: 'Category|pc_duoi_xem_nhieu',
    value: 3,
    allowDimension: ['300x250']
  }, {
    type: 'pc_duoi_moi_nhat',
    name: 'Danh mục PC - Dưới mới nhất',
    parent: 'Category|pc_duoi_moi_nhat',
    value: 4,
    allowDimension: ['800x350']
  }, {
    type: 'pc_duoi_ti_gia',
    name: 'Danh mục PC - Dưới tỉ giá',
    parent: 'Category|pc_duoi_ti_gia',
    value: 5,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_phai_giua_trang',
    name: 'Danh mục PC - Bên phải giữa trang',
    parent: 'Category|pc_ben_phai_giua_trang',
    value: 6,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_trai_giua_trang',
    name: 'Danh mục PC - Bên trái giữa trang',
    parent: 'Category|pc_ben_trai_giua_trang',
    value: 7,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_phai_cuoi_trang',
    name: 'Danh mục PC - Bên phải cuối trang',
    parent: 'Category|pc_ben_phai_cuoi_trang',
    value: 8,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_trai_cuoi_trang',
    name: 'Danh mục PC - Bên trái cuối trang',
    parent: 'Category|pc_ben_trai_cuoi_trang',
    value: 9,
    allowDimension: ['300x250']
  }, {
    type: 'pc_cuoi_trang',
    name: 'Danh mục PC - Cuối trang',
    parent: 'Category|pc_cuoi_trang',
    value: 10,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_dinh_dau',
    name: 'Danh mục Mobile - Đỉnh đầu',
    parent: 'Category|mobile_dinh_dau',
    value: 11,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_duoi_tin_moi_nhat',
    name: 'Danh mục Mobile - Dưới tin mới nhất',
    parent: 'Category|mobile_duoi_tin_moi_nhat',
    value: 12,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_cuoi_trang',
    name: 'Danh mục Mobile - Cuối trang',
    parent: 'Category|mobile_cuoi_trang',
    value: 13,
    allowDimension: ['300x250']
  }]
}, {
  type: 'Tag',
  name: 'Chi tiết Hashtag',
  value: 1,
  list_position: [{
    type: 'pc_dinh_dau',
    name: 'Danh mục PC - Đỉnh đầu',
    parent: 'Tag|pc_dinh_dau',
    value: 1,
    allowDimension: ['728x90', '250x300']
  }, {
    type: 'pc_duoi_tieu_diem',
    name: 'Danh mục PC - Dưới tiêu điểm',
    parent: 'Tag|pc_duoi_tieu_diem',
    value: 2,
    allowDimension: ['300x250']
  }, {
    type: 'pc_duoi_ti_gia',
    name: 'Danh mục PC - Dưới tỉ giá',
    parent: 'Tag|pc_duoi_ti_gia',
    value: 3,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_phai_giua_trang',
    name: 'Danh mục PC - Bên phải giữa trang',
    parent: 'Tag|pc_ben_phai_giua_trang',
    value: 4,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_trai_giua_trang',
    name: 'Danh mục PC - Bên trái giữa trang',
    parent: 'Tag|pc_ben_trai_giua_trang',
    value: 5,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_phai_cuoi_trang',
    name: 'Danh mục PC - Bên phải cuối trang',
    parent: 'Tag|pc_ben_phai_cuoi_trang',
    value: 6,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_trai_cuoi_trang',
    name: 'Danh mục PC - Bên trái cuối trang',
    parent: 'Tag|pc_ben_trai_cuoi_trang',
    value: 7,
    allowDimension: ['300x250']
  }, {
    type: 'pc_cuoi_trang',
    name: 'Danh mục PC - Cuối trang',
    parent: 'Tag|pc_cuoi_trang',
    value: 8,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_dinh_dau',
    name: 'Danh mục Mobile - Đỉnh đầu',
    parent: 'Tag|mobile_dinh_dau',
    value: 9,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_cuoi_trang',
    name: 'Danh mục Mobile - Cuối trang',
    parent: 'Tag|mobile_cuoi_trang',
    value: 10,
    allowDimension: ['300x250']
  }]
}, {
  type: 'Article',
  name: 'Chi tiết Bài Viết',
  value: 1,
  list_position: [{
    type: 'pc_dinh_dau',
    name: 'Bài viết PC - Đỉnh đầu',
    parent: 'Article|pc_dinh_dau',
    value: 1,
    allowDimension: ['728x90', '250x300']
  }, {
    type: 'pc_duoi_tieu_diem',
    name: 'Bài viết PC - Dưới tiêu điểm',
    parent: 'Article|pc_duoi_tieu_diem',
    value: 2,
    allowDimension: ['300x250']
  }, {
    type: 'pc_duoi_ti_gia',
    name: 'Bài viết PC - Dưới tỉ giá',
    parent: 'Article|pc_duoi_ti_gia',
    value: 3,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_phai_giua_trang',
    name: 'Bài viết PC - Bên phải giữa trang',
    parent: 'Article|pc_ben_phai_giua_trang',
    value: 4,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_trai_giua_trang',
    name: 'Bài viết PC - Bên trái giữa trang',
    parent: 'Article|pc_ben_trai_giua_trang',
    value: 5,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_phai_cuoi_trang',
    name: 'Bài viết PC - Bên phải cuối trang',
    parent: 'Tag|pc_ben_phai_cuoi_trang',
    value: 6,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_trai_cuoi_trang',
    name: 'Bài viết PC - Bên trái cuối trang',
    parent: 'Article|pc_ben_trai_cuoi_trang',
    value: 7,
    allowDimension: ['300x250']
  }, {
    type: 'pc_cuoi_trang',
    name: 'Bài viết PC - Cuối trang',
    parent: 'Article|pc_cuoi_trang',
    value: 8,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_dinh_dau',
    name: 'Bài viết Mobile - Đỉnh đầu',
    parent: 'Article|mobile_dinh_dau',
    value: 9,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_cuoi_trang',
    name: 'Bài viết Mobile - Cuối trang',
    parent: 'Article|mobile_cuoi_trang',
    value: 10,
    allowDimension: ['300x250']
  }]
}, {
  type: 'Search',
  name: 'Tìm kiếm',
  value: 1,
  list_position: [{
    type: 'pc_dinh_dau',
    name: 'Tìm kiếm PC - Đỉnh đầu',
    parent: 'Search|pc_dinh_dau',
    value: 1,
    allowDimension: ['728x90', '250x300']
  }, {
    type: 'pc_duoi_tieu_diem',
    name: 'Tìm kiếm PC - Dưới tiêu điểm',
    parent: 'Search|pc_duoi_tieu_diem',
    value: 2,
    allowDimension: ['300x250']
  }, {
    type: 'pc_duoi_ti_gia',
    name: 'Tìm kiếm PC - Dưới tỉ giá',
    parent: 'Search|pc_duoi_ti_gia',
    value: 3,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_phai_giua_trang',
    name: 'Tìm kiếm PC - Bên phải giữa trang',
    parent: 'Search|pc_ben_phai_giua_trang',
    value: 4,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_trai_giua_trang',
    name: 'Tìm kiếm PC - Bên trái giữa trang',
    parent: 'Search|pc_ben_trai_giua_trang',
    value: 5,
    allowDimension: ['300x600']
  }, {
    type: 'pc_ben_phai_cuoi_trang',
    name: 'Tìm kiếm PC - Bên phải cuối trang',
    parent: 'Search|pc_ben_phai_cuoi_trang',
    value: 6,
    allowDimension: ['300x250']
  }, {
    type: 'pc_ben_trai_cuoi_trang',
    name: 'Tìm kiếm PC - Bên trái cuối trang',
    parent: 'Search|pc_ben_trai_cuoi_trang',
    value: 7,
    allowDimension: ['300x250']
  }, {
    type: 'pc_cuoi_trang',
    name: 'Tìm kiếm PC - Cuối trang',
    parent: 'Search|pc_cuoi_trang',
    value: 8,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_dinh_dau',
    name: 'Tìm kiếm Mobile - Đỉnh đầu',
    parent: 'Search|mobile_dinh_dau',
    value: 9,
    allowDimension: ['300x250']
  }, {
    type: 'mobile_cuoi_trang',
    name: 'Tìm kiếm Mobile - Cuối trang',
    parent: 'Search|mobile_cuoi_trang',
    value: 10,
    allowDimension: ['300x250']
  }]
}];
var Dimention = exports.Dimention = ["250x250", "200x200", "468x60", "728x90", "300x250", "336x280", "120x600", "160x600", "300x600", "970x90"];
var imageDimention = exports.imageDimention = [{
  value: "728x90",
  link: "/admin/images/ads/728x90.png",
  desc: "Phù hợp với dạng banner trên desktop"
}, {
  value: "300x600",
  link: "/admin/images/ads/200x400.png",
  desc: "Phù hợp làm banner hai bên site"
}, {
  value: "300x100",
  link: "/admin/images/ads/300x100.png",
  desc: "Phù hợp làm banner trong nội dung content, hoặc sidebar bên phải"
}];