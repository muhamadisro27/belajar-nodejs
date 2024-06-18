import { prismaClient } from "../app/database.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (req) => {
  const user = validate(registerUserValidation, req);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "User already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (req, res) => {
  const loginReq = validate(loginUserValidation, req);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginReq.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(
      401,
      "These credentials is not match with our records !"
    );
  }

  const isPasswordValid = await bcrypt.compare(
    loginReq.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(
      401,
      "These credentials is not match with our records !"
    );
  }

  const token = uuid().toString();

  return await prismaClient.user.update({
    data: {
      token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

const findByUsername = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found !");
  }

  return user;
};

const updateByUsername = async (req) => {
  const user = validate(updateUserValidation, req);

  const checkUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (checkUser < 1) {
    throw new ResponseError(404, "User is not found !");
  }

  const data = {};

  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data,
    select: {
      username: true,
      name: true,
    },
  });
};

const logout = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found !");
  }

  return prismaClient.user.update({
    where: {
      username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

export default { register, login, findByUsername, updateByUsername, logout };
