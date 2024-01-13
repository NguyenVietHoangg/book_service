
import { decodeToken, validPermissions } from '../helpers/jwtToken'
import * as eResponse from '../config/eResponse'
import { INVALID_TOKEN, INVALID_PREMISSION } from './../config/typeAlias'
import * as typeAlias from './../config/typeAlias'
import cache from '../cache'
import * as Model from "../database/models";
import { forEach } from 'lodash';
export const auth = async (req, res, next) => {
  const token = req.header("authorization");
  const user = decodeToken(token);
  if (!user) {
    return res.send(eResponse._errorByHand(INVALID_TOKEN));
  }
  if (!validPermissions(user)) {
    return res.send(eResponse._errorByHand(INVALID_PREMISSION));
  }
  if (Date.now() > user.exp * 1000) {
    return res.send(eResponse._errorByHand(INVALID_TOKEN));
  }
  const keyCache = cache.genKeyPublic("black_list_", { user: user.id });
  let tokenCheck = await cache.get(keyCache, false);
  if (!tokenCheck) {
    const tokenBlacklistExist = await countAll("Blacklist_Token", {
      where: { token: token },
    });
    if (tokenBlacklistExist) {
      return res.send(eResponse._errorByHand(INVALID_TOKEN));
    }
  } else if (tokenCheck && token === tokenCheck) {
    return res.send(eResponse._errorByHand(INVALID_TOKEN));
  }
  global.user = user;
  next();
};
export const checkRole = async (req, res, next) => {
  try {
      const token = req.header('Authorization');
      if (!token) {
          console.error('Token not provided');
          return res.sendStatus(401);
      }

      const role = decodeToken(token);
      if (!role || !role.grouproleid) {
          console.error('Invalid role information in the token');
          return res.sendStatus(403);
      }

      const grouproles = await Model.grouprole_has_permission.findAll({ where: { groupId: role.grouproleid } });
      const groupPermission = grouproles.map(item => item.permissionId);

      const permissionList = await Model.permission.findAll({ where: { id: groupPermission } });

      if ( permissionList.some(permission =>permission.method=="GET" && permission.route.includes(req.path.substring(0, req.path.lastIndexOf('/'))))) {
        console.log('Permission granted');
        next();
      }else if( permissionList.some(permission =>permission.method=="POST" && permission.route.includes(req.path))){
        console.log('Permission granted');
        next();
      } else {
          console.error('Invalid permission');
          return res.sendStatus(403);
      }
  } catch (error) {
      console.error('Error while checking role:', error);
      return res.sendStatus(500);
  }
};
// const checkRole = (req) => {
//   try {
//     const { admin } = req.session;
//     const publicRouters = [
//       "GET&route=/admin/auth",
//       "POST&route=/admin/auth",
//       "GET&route=/admin/logout",
//       "POST&route=/admin/logout",
//     ];
//     let urldefined = req.originalUrl;
//     if (urldefined.includes("?")) {
//       urldefined = urldefined.substring(0, urldefined.indexOf("?"));
//     }
//     const urlArr = urldefined.split("/");
//     if (urlArr.length >= 2) {
//       let per = `${req.method}&route=${urlArr[0]}/${urlArr[1]}`;

//       if (urlArr[2]) {
//         per += `/${urlArr[2]}`;
//         if (urlArr[3]) {
//           per += `/${urlArr[3]}`;
//         }
//       }
//       if (!admin || !admin.pers) {
//         return false;
//       }
//       const permissions = admin.pers.join(",").toLowerCase();
//       if (
//         publicRouters
//           .join(",")
//           .toLocaleLowerCase()
//           .includes(per.toLocaleLowerCase()) ||
//         permissions.includes(per.toLowerCase())
//       ) {
//         return true;
//       }
//     }
//     return false;
//   } catch (error) {
//     console.log("error", error);
//     return false;
//   }
// };

export default auth;
