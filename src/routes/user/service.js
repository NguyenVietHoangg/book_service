
import * as Model from "../../database/models";
import { signToken, validToken } from "../../helpers/jwtToken";
export const getUserLogin = async (data) => {
  // const { email, password } = data;
  const email = data.data.email;
  const password = data.data.password;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const user = await Model.user.findOne({ where: { email: email } });
  if (!emailRegex.test(email) || password <= 4) {
    return { status: 401, message: " Data is not in the correct format" };
  }
  if (user == null) {
    return { status: 401, message: " Account or password is incorrect" };
  }
  // Kiểm tra xem người dùng có tồn tại không

  const isValidPassword = password === user.password ? true : false;
  if (!isValidPassword) {
    return { status: 401, message: " Account or password is incorrect" };
  }
  //Tạo token JWT
  const token = await signToken({ id: user.id, name: user.name, grouproleid : user.grouproleId });
  return { status: 200, message: token };
};
export const getUserLogout = async (data) =>  {
  res.clearCookie('');
  return { status: 200, message: "okii" };
}
export default {
  getUserLogin,
};
