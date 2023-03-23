import { userDb, addUser, getAllUsers } from 'database/userDb.js';
import ErrorHandler from 'utility/ErrorHandler.js';
import findUser from 'utility/findUser.js';
import User from 'utility/User.js';
import { createUserValidator, updateUserValidator } from 'utility/validation.js';


/**
 * Return the user with the mentioned id otherwise returns an error
 **/
export const getUserWithId = (req, res, next) => {
    const user = findUser(req.params?.id);
    if (!user) {
        return  next(new ErrorHandler('Enter correct user id', 404));
    }
    res.status(200).json(user);
};

/**
 * Creates a user with mentioned details if specified correctly otherwise
 * returns an error.
 **/
export const createUser = (req, res, next) => {
    const { error } = createUserValidator(req.body);
    if (error) {
        // Returns all errors concatinated in a string if validation fails
        const errMsg = error.details.reduce((arg, ele) => arg.concat(ele.message, ' '), '');

        return next(new ErrorHandler(errMsg, 400));
    }

    const { login, password, age } = req.body;
    const user = new User(login, password, age);
    addUser(user);
    res.status(203).json(user);
};

/**
 * Updates the user details according to the request if validation is true else returns an error
 **/
export const updateUser = (req, res, next) => {
    const user = findUser(req.params?.id);
    if (!user) {
        // If user not found return an error
        return next(new ErrorHandler('Enter correct user Id', 404));
    }
    const { error } = updateUserValidator(req.body);
    if (error) {
        // Returns all errors concatinated in a string if validation fails
        const errMsg = error.details.reduce((arg, ele) => arg.concat(ele.message, ' '), '');

        return next(new ErrorHandler(errMsg, 400));
    }

    Object.assign(user, req.body);

    res.status(200).send(user);
};
/**
 * Soft deletes the user whoes id is provided in request otherwise responds with error
 **/
export const deleteUser = (req, res, next) => {
    const user = findUser(req.params?.id);
    if (!user) {
        // If user not found return an error
        return next(new ErrorHandler('Enter correct user Id', 404));
    }
    user.isDeleted = true;
    res.status(200).send('User deleted successfully');
};

/**
 * Returns 'limit' number of users which starts with the loginSubstring query in sorted order according to their login
 **/
export const getAutoSuggestUsers = (req, res) => {
    const { loginSubstring = '', limit = 2 } = req.query;
    const requiredUsers = getAllUsers().filter((user) => user.login.startsWith(loginSubstring)).sort((a, b) => a.login.localeCompare(b.login)).slice(0, limit);
    res.status(200).send(requiredUsers);
};

/**
 * Soft deletes the user whoes id is provided in request otherwise responds with error
 **/
export const getEveryUser = (req, res) => {
    res.send(userDb);
};
