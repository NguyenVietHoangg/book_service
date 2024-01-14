import { logger } from "./logFile";
import { INVALID_TOKEN } from "../config/typeAlias";

export const _errorNetwork = (
  message = "Kết nối mạng có vấn đề vui lòng xem lại"
) => ({
  code: 504,
  msg: `${message}` || "Kết nối mạng có vấn đề vui lòng xem lại",
  data: null,
});

export const _errorNetworkJson = (
  message = "Kết nối mạng có vấn đề vui lòng xem lại"
) =>
  JSON.stringify({
    code: 504,
    msg: `${message}` || "Kết nối mạng có vấn đề vui lòng xem lại",
    data: null,
  });

export const _errorResquestNotFound = (
  message = 'Đường dẫn không tồn tại'
) => ({
  code: 404,
  msg: message,
  data: null,
});

export const _errorResquestNotFoundJson = (
  message = "Yêu cầu không tồn tại",
  url = null
) =>
  JSON.stringify({
    code: 404,
    msg: `${message}, ${url} không tồn tại`,
    data: null,
  });

export const _errorOnTryCatch = (err, message) => {
  logger.log("error", err.message);
  return {
    code: 9999,
    msg: message || `Có lỗi xảy ra, hãy kiểm lại thông tin`,
    data: err,
    catch: err.message,
  };
};

export const _errorOnTryCatchJson = (
  err = null,
  message = "Có lỗi xảy ra, hãy kiểm tra lại thông tin"
) => {
  logger.log("error", err.message);
  return JSON.stringify({
    code: 9999,
    msg: message || `Có lỗi xảy ra, hãy kiểm lại thông tin`,
    data: err,
    catch: err.message,
  });
};

export const _errorDataNotFound = (
  message = "Dữ liệu không tồn tại",
  res = null
) => ({
  code: 404,
  msg: message || `Dữ liệu không tồn tại`,
  data: res,
});

export const _errorDataNotFoundJson = (
  message = "Dữ liệu không tồn tại",
  res = null
) =>
  JSON.stringify({
    code: 404,
    msg: message || `Dữ liệu không tồn tại`,
    data: res,
  });

export const _success = (message = "Thành công", res = null) => ({
  code: 0,
  message: message || "Thành công",
  data: res,
});

export const _successJson = (message = "Thành công", res = null) =>
  JSON.stringify({
    code: 0,
    message: message || "Thành công",
    data: res,
  });

export const _successMerge = (message = "Thành công", res = null) => ({
  ...{
    code: 0,
    msg: message || "Thành công",
  },
  ...res,
});

export const _successMergeJson = (message = "Thành công", res = null) =>
  JSON.stringify({
    ...{
      code: 0,
      msg: message || "Thành công",
    },
    ...res,
  });

export const _errorByHand = (
  message = "Có lỗi xảy ra, vui lòng quay lại sau",
  res = null
) => ({
  code: message === INVALID_TOKEN ? 401 : 9998,
  msg: message || `Có lỗi xảy ra, vui lòng quay lại sau`,
  data: res,
});

export const _errorByHandJSon = (
  message = "Có lỗi xảy ra, vui lòng quay lại sau",
  res = null
) =>
  JSON.stringify({
    code: message === INVALID_TOKEN ? 401 : 9998,
    msg: message || `Có lỗi xảy ra, vui lòng quay lại sau`,
    data: res,
  });
  export const _successMenu = (message = "Thành công", res = null) =>
  JSON.stringify({
    code: 200,
    message: message || "Thành công",
    data: res,
  });