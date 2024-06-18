import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const findByUsername = async (req, res, next) => {
  try {
    const username = req.user.username;
    const result = await userService.findByUsername(username);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateByUsername = async (req, res, next) => {
  try {
    const username = req.user.username;
    const request = req.body;
    request.username = username;

    const result = await userService.updateByUsername(request);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.username);

    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

export { register, login, findByUsername, updateByUsername, logout };
