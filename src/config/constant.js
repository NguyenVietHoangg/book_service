export default {
  groupRole: [
    { type: 'root', name: 'Root' },
    { type: 'admin', name: 'Admin' },
    { type: 'partner', name: 'Đối tác' },
    { type: 'custom', name: 'Tùy chỉnh' }
  ],
  getRandomColor: () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  },
  getStatus: (status=null) => {
    switch (status) {
      case 'on':
        return {name: 'Đang Bật', style: 'color: white; font-weight: bold; background-color: #278601; padding: 2px 5px; margin: 0 10px;'}
      case 'review':
        return {name: 'Chờ Duyệt', style: 'color: white; font-weight: bold; background-color: #028aff; padding: 2px 5px; margin: 0 10px;'}
      case 'off':
        return {name: 'Đã Tắt', style: 'color: white; font-weight: bold; background-color:#afada7; padding: 2px 5px; margin: 0 10px;'}
      case 'need_edit':
        return {name: 'Y/c Sửa Lại', style: 'color: white; font-weight: bold; background-color:orange; padding: 2px 5px; margin: 0 10px;'}
      case 'approved':
        return {name: 'Đã Duyệt', style: 'color: white; font-weight: bold; background-color:##D81B60; padding: 2px 5px; margin: 0 10px;'}
      case 'draft':
        return {name: 'Bản Nháp', style: 'color: white; font-weight: bold; background-color:#afada7; padding: 2px 5px; margin: 0 10px;'}
        default:
        return {name: 'Không xác định', style: 'color: white; font-weight: bold; background-color: #afada7; padding: 2px; margin: 0 10px;'}
    }
  },
  colors: [
    '#fe694d', '#5c3f66', '#94cbda', '#c87e43', '#a0bffd', '#01e17f', '#fc507f', '#c728c9', '#887275', '#b072d5', '#2cf4ad', '#204476', '#f9a385', '#0aa454', '#64409d', '#64409d'
  ]
}