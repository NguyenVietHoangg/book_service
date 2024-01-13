import jwt from "jsonwebtoken";
import _ from "lodash";

import {
  JWT_SECRET,
  JWT_EXPIRED,
  ROLE_FULLVIEW,
  ROLE_LEADER,
} from "../config/common";
import { permissionGroups } from "../config/premissons";

export const signToken = (data) => {
  console.log(data);
  return data ? jwt.sign(data, JWT_SECRET, { expiresIn: "1h" }) : null;
};

export const decodeToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET) || null;
  } catch (error) {
    console.log("error decodeToken", error);
    return null;
  }
};

export const validToken = (token) => {
  if (!token) {
    return false;
  }
  const tokenSplit = token.split(" ");
  return tokenSplit[0] === "Bearer" && tokenSplit[1] ? tokenSplit[1] : null;
};

export const validPermissions = (user) => {
  if (!permissionGroups(user)) {
    return false;
  }
  return true;
};
