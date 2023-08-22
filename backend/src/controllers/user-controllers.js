import userService from "../service/user-service.js";
import { prismaClient } from "../config/database.js";
import refreshToken from "../service/refresh-token.js";

const getUsers = async (req, res, next) => {
  try {
    const result = await prismaClient.user.findMany({
      where: {
        username: req.username
      },
      select: {
        username: true
      }
    });
    res.status(200).json({
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const request = req.body;
    await userService.register(request);
    res.status(200).json({
      message: "Register Successfully"
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userService.login(request, res);
    res.status(200).json({
      token: result
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const username = req.username;
    const request = req.body;
    request.username = username;
    const result = await userService.updateUser(request);
    res.status(200).json({
      message: "Change Password OK",
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logoutUser(req, res);
  } catch (error) {
    next(error);
  }
};

const Token = async (req, res) => {
  try {
    await refreshToken(req, res);
    res.status(200);
  } catch (error) {
    next(error);
  }
};

export { register, login, getUsers, update, logout, Token };
