import ErrorHandler from "utility/ErrorHandler.js";
import User from "utility/User.js";
import {
  createUserValidator,
  updateUserValidator,
} from "utility/validation.js";
import UserModel from "models";
import UserService from "services";

/**
 * Return the user with the mentioned id otherwise returns an error
 **/
export const getUserWithId = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.params?.id);
    res.status(200).json(user);
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

/**
 * Creates a user with mentioned details if specified correctly otherwise
 * returns an error.
 **/
export const createUser = async (req, res, next) => {
  const { error } = createUserValidator(req.body);
  if (error) {
    // Returns all errors concatinated in a string if validation fails
    const errMsg = error.details.reduce(
      (arg, ele) => arg.concat(ele.message, " "),
      ""
    );

    return next(new ErrorHandler(errMsg, 400));
  }
  try {
    const { login, password, age } = req.body;
    const user = new User(login, password, age);
    await UserService.createUser(user);
    res.status(203).json("User created successfully");
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

/**
 * Updates the user details according to the request if validation is true else returns an error
 **/
export const updateUser = async (req, res, next) => {
  const { error } = updateUserValidator(req.body);
  if (error) {
    // Returns all errors concatinated in a string if validation fails
    const errMsg = error.details.reduce(
      (arg, ele) => arg.concat(ele.message, " "),
      ""
    );

    return next(new ErrorHandler(errMsg, 400));
  }

  try {
    const user = await UserService.updateUserById(req.params.id, req.body);
    res.status(202).json(user);
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};
/**
 * Soft deletes the user whoes id is provided in request otherwise responds with error
 **/
export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUserById(req.params.id);
    res.status(200).send("User deleted successfully");
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
};

/**
 * Returns 'limit' number of users which starts with the loginSubstring query in sorted order according to their login
 **/
export const getAutoSuggestUsers = async (req, res, next) => {
  try {
    const { loginSubstring = "", limit = 2 } = req.query;
    const users = await UserService.getAllUsers({ loginSubstring, limit });
    res.status(200).json(users);
  } catch (err) {
    return next(new ErrorHandler(err, 400));
  }
};

/**
 * Soft deletes the user whoes id is provided in request otherwise responds with error
 **/
export const getEveryUser = async (req, res) => {
  try {
    const data = await UserModel.findAll();
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
  }
};
