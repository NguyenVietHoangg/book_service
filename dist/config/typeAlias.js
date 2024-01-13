"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VALUE_REQUEST_IS_EMPTY = exports.UPLOAD_FAILD = exports.UPDATE_SUCCESS = exports.UPDATE_FAILED = exports.SUCCESS = exports.RELOAD_ALL_ROUTERS_CMS = exports.NOT_FOUND = exports.NOT_EXIST_TIMEACTIVE = exports.NOT_EXIST_TAG = exports.NOT_EXIST_SPORT_CHOOSE = exports.NOT_EXIST_SPORT = exports.NOT_EXIST_ROOM = exports.NOT_EXIST_NOTE = exports.NOT_EXIST_FILE = exports.NOT_EXIST_DEAL = exports.NOT_EXIST_CUSTOMER = exports.NOT_EXIST_ACTIVITY = exports.NOT_EXIST_ACCOUNT = exports.NOT_ACTIVED_ACCOUNT = exports.MOBILE_REQUIRE = exports.MISSING_TYPE_ACTIVITY = exports.LOCKED_ACCOUNT = exports.INVALID_USERNAME = exports.INVALID_TOKEN = exports.INVALID_PREMISSION = exports.INVALID_PHONE_OR_EMAIL = exports.INVALID_PHONE_CUSTOMER = exports.INVALID_PHONE = exports.INVALID_PASSWORD = exports.INVALID_EMAIL = exports.INVALID_CURRENT_PASSWORD = exports.IMG_NOT_FOUND = exports.EXIST_TAG = exports.EXIST_SPORT = exports.EXIST_ROOM = exports.EXIST_RECORD = exports.EXIST_PRODUCT = exports.EXIST_NOTE = exports.EXIST_DEAL = exports.EXIST_CUSTOMER = exports.EXIST_ACTIVITY = exports.EXIST_ACCOUNT = exports.ERROR_CREATE_TOKEN = exports.ERROR = exports.EMPTY_REMEMBER_DEAL = exports.EMPTY_PHONE_CUSTOMER = exports.EMPTY_NAME_CUSTOMER = exports.EMPTY_EMAIL_CUSTOMER = exports.EMPTY_CUSTOMER = exports.EMAIL_REQUIRE = exports.BANNER_NOT_FOUND = exports.ADD_SUCCESS = void 0;
//common
var RELOAD_ALL_ROUTERS_CMS = exports.RELOAD_ALL_ROUTERS_CMS = 'RELOAD_ALL_ROUTERS_CMS';
var INVALID_PREMISSION = exports.INVALID_PREMISSION = 'Không có quyền thực hiện';
var INVALID_TOKEN = exports.INVALID_TOKEN = 'Token không tồn tại hoặc không chính xác';
var ERROR_CREATE_TOKEN = exports.ERROR_CREATE_TOKEN = 'Không khởi tạo được token hệ thống';
var VALUE_REQUEST_IS_EMPTY = exports.VALUE_REQUEST_IS_EMPTY = 'Dữ liệu đầu vào bị rỗng';
var UPDATE_FAILED = exports.UPDATE_FAILED = 'Cập nhật không thành công';
var MOBILE_REQUIRE = exports.MOBILE_REQUIRE = 'Hãy nhập số điện thoại';
var EMAIL_REQUIRE = exports.EMAIL_REQUIRE = 'Hãy nhập email';
var ERROR = exports.ERROR = 'Có lỗi xảy ra, vui lòng thử lại';
var SUCCESS = exports.SUCCESS = 'Thành công';
var NOT_FOUND = exports.NOT_FOUND = 'Không tìm thấy dữ liệu';
var EXIST_RECORD = exports.EXIST_RECORD = 'Dữ liệu đã tồn tại, vui lòng chọn dữ liệu khác';
var BANNER_NOT_FOUND = exports.BANNER_NOT_FOUND = 'Thiếu ảnh đại diện vui lòng chọn lại';
var IMG_NOT_FOUND = exports.IMG_NOT_FOUND = 'Thiếu hình ảnh vui lòng chọn lại';
var ADD_SUCCESS = exports.ADD_SUCCESS = 'Thêm mới thành công';
var UPDATE_SUCCESS = exports.UPDATE_SUCCESS = 'Cập nhật thành công';

//timeactive
var NOT_EXIST_TIMEACTIVE = exports.NOT_EXIST_TIMEACTIVE = 'Vui lòng chọn thời gian trước khi thêm';

//room
var NOT_EXIST_ROOM = exports.NOT_EXIST_ROOM = 'Vui lòng tạo phòng trước khi thêm';
var EXIST_ROOM = exports.EXIST_ROOM = 'Phòng đã tồn tại';

//product
var EXIST_PRODUCT = exports.EXIST_PRODUCT = 'Sản phẩm đã tồn tại';

//user
var NOT_EXIST_ACCOUNT = exports.NOT_EXIST_ACCOUNT = 'tài khoản hoặc mật khẩu đăng nhập không chính xác hoặc tài khoản đang bị khóa!';
var EXIST_ACCOUNT = exports.EXIST_ACCOUNT = 'Tài khoản đã tồn tại trên hệ thống';
var INVALID_PASSWORD = exports.INVALID_PASSWORD = 'Mật khẩu phải từ 8-30 ký tự bao gồm chữ và số, ký tự đặc biệt, ký tự đầu tiên phải là chữ cái';
var INVALID_USERNAME = exports.INVALID_USERNAME = 'Tên đăng nhập phải từ 6-20 ký tự và không có khoảng trắng';
var INVALID_EMAIL = exports.INVALID_EMAIL = 'Email không đúng định dạng';
var INVALID_PHONE = exports.INVALID_PHONE = 'Một hoặc vài số điện thoại có thể không đúng định dạng';
var INVALID_CURRENT_PASSWORD = exports.INVALID_CURRENT_PASSWORD = 'Mật khẩu hiện tại không chính xác';
var INVALID_PHONE_OR_EMAIL = exports.INVALID_PHONE_OR_EMAIL = 'Tài khoản đăng nhập phải là email hoặc số điện thoại';
var LOCKED_ACCOUNT = exports.LOCKED_ACCOUNT = 'Tài khoản bị khóa';
var NOT_ACTIVED_ACCOUNT = exports.NOT_ACTIVED_ACCOUNT = 'Tài khoản chưa được kích hoạt';

//deal
var NOT_EXIST_DEAL = exports.NOT_EXIST_DEAL = 'Giao dịch không tồn tại trên hệ thống';
var EXIST_DEAL = exports.EXIST_DEAL = 'Giao dịch đã tồn tại trên hệ thống';
var EMPTY_REMEMBER_DEAL = exports.EMPTY_REMEMBER_DEAL = 'Yêu cầu nhập thông tin gợi nhớ';

//activity
var NOT_EXIST_ACTIVITY = exports.NOT_EXIST_ACTIVITY = 'Hoạt động không tồn tại trên hệ thống';
var EXIST_ACTIVITY = exports.EXIST_ACTIVITY = 'Hoạt động đã tồn tại trên hệ thống';
var MISSING_TYPE_ACTIVITY = exports.MISSING_TYPE_ACTIVITY = 'Kiểu hoạt động không cho phép';

//note
var NOT_EXIST_NOTE = exports.NOT_EXIST_NOTE = 'Ghi chú không tồn tại trên hệ thống';
var EXIST_NOTE = exports.EXIST_NOTE = 'Ghi chú đã tồn tại trên hệ thống';

//tag
var NOT_EXIST_TAG = exports.NOT_EXIST_TAG = 'Tag không tồn tại trên hệ thống';
var EXIST_TAG = exports.EXIST_TAG = 'Tag đã tồn tại trên hệ thống';

//sport
var NOT_EXIST_SPORT = exports.NOT_EXIST_SPORT = 'Môn thể thao không tồn tại trên hệ thống';
var NOT_EXIST_SPORT_CHOOSE = exports.NOT_EXIST_SPORT_CHOOSE = 'Bạn chưa chọn môn thể thao nào';
var EXIST_SPORT = exports.EXIST_SPORT = 'Môn thể thao đã tồn tại trên hệ thống';

//customer
var NOT_EXIST_CUSTOMER = exports.NOT_EXIST_CUSTOMER = 'Khách hàng không tồn tại trên hệ thống';
var EXIST_CUSTOMER = exports.EXIST_CUSTOMER = 'Khách hàng đã tồn tại trên hệ thống';
var EMPTY_CUSTOMER = exports.EMPTY_CUSTOMER = 'Yêu cầu nhập thông tin khách hàng';
var EMPTY_NAME_CUSTOMER = exports.EMPTY_NAME_CUSTOMER = 'Yêu cầu nhập tên khách hàng';
var EMPTY_PHONE_CUSTOMER = exports.EMPTY_PHONE_CUSTOMER = 'SDT khách hàng không được để trống';
var EMPTY_EMAIL_CUSTOMER = exports.EMPTY_EMAIL_CUSTOMER = 'Email khách hàng không được để trống';
var INVALID_PHONE_CUSTOMER = exports.INVALID_PHONE_CUSTOMER = 'Số điện thoại khách hàng không hợp lệ';

//upload fail
var UPLOAD_FAILD = exports.UPLOAD_FAILD = 'Upload file không thành công';
var NOT_EXIST_FILE = exports.NOT_EXIST_FILE = 'Vui lòng chọn file để upload';