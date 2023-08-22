import {
  userLoginScema,
  userScema,
  userUpdateScema
} from "../validate/userValidate.js";
import validate from "../validate/validate.js";
import { prismaClient } from "../config/database.js";
import ResponseError from "../error/responseError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (request) => {
  const user = validate(userScema, request);

  const userConst = await prismaClient.user.count({
    where: {
      username: user.username
    }
  });

  if (userConst === 1) {
    throw new ResponseError(400, "User Already Exists");
  }

  const hassPassword = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: {
      username: user.username,
      password: hassPassword
    },
    select: {
      username: true
    }
  });
};

const login = async (req, response) => {
  const user = validate(userLoginScema, req);

  const userCount = await prismaClient.user.findUnique({
    where: {
      username: user.username
    }
  });
  if (!userCount) {
    throw new ResponseError(401, "Username Or Password Wrong");
  }

  const match = await bcrypt.compare(user.password, userCount.password);
  if (!match) {
    throw new ResponseError(401, "Username Or Password Wrong");
  }

  const username = userCount.username;

  const ACCES_TOKEN_SECRET =
    "chjebcahecaniacot382659482f20fnajc381ybchiabe7282432563y86209878656534798ryy942rjp";
  const REFRESH_TOKEN_SECRET =
    "cwpjcpvmvnmmmakchaicfeq8e7u90i029t2gmwmfnqf298133245354657689y5e2332047ty34rjfn2fh";

  const token = jwt.sign({ username }, ACCES_TOKEN_SECRET, {
    expiresIn: "20s"
  });

  const refreshToken = jwt.sign({ username }, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d"
  });

  await prismaClient.user.update({
    data: {
      token: refreshToken
    },
    where: {
      username: username
    }
  });

  response.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  });

  return token;
};

const updateUser = async (request) => {
  const user = validate(userUpdateScema, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username
    },
    select: {
      username: true
    }
  });

  if (countUser.username !== 1) throw new ResponseError(400, "User Not Found");

  const find = await prismaClient.user.findUnique({
    where: {
      username: user.username
    },
    select: {
      password: true
    }
  });

  const comparePass = await bcrypt.compare(user.passwordLama, find.password);
  if (!comparePass) throw new ResponseError(400, "Your Old Password Wrong");

  const password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.update({
    where: {
      username: user.username
    },
    data: {
      password: password
    },
    select: {
      username: true
    }
  });
};

const logoutUser = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await prismaClient.user.findUnique({
    where: {
      token: refreshToken
    }
  });

  if (!user) return res.sendStatus(204);

  await prismaClient.user.update({
    where: {
      username: user.username
    },
    data: {
      token: null
    }
  });
  res.clearCookie("refreshToken");
  res.sendStatus(200);
};

export default {
  register,
  login,
  updateUser,
  logoutUser
};
