import UserModel from "../models";
import { Op } from "sequelize";

class UserService {
  /**
   * Creates new user in the database
   */
  static async createUser(userData) {
    try {
      const data = await UserModel.create(userData);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Fetches User from the database according to the Id provided. If Id is
   * invalid, the function throws an error
   */
  static async getUserById(id) {
    try {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error("Enter Valid Id");
      }
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   *  Fetches all users from the database if constraints argument not provided else fetches Users that starts with the string property provided in the constraints object and sorts the Users according to their login property
   */
  static async getAllUsers(constraints) {
    try {
      if (!constraints) {
        return await UserModel.findAll();
      }

      const { loginSubstring, limit } = constraints;
      return await UserModel.findAll({
        where: {
          login: {
            [Op.startsWith]: loginSubstring,
          },
        },
        order: ["login"],
        limit,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Fetches the User from the database by using the Id and then updates its details according to the updatedUserData argument provided.
   */
  static async updateUserById(id, updatedUserData) {
    try {
      const user = await UserService.getUserById(id);

      // user.login = updatedUserData?.login ? updatedUserData.login : user.login;
      // user.password = updatedUserData?.password ? updatedUserData.password : user.password;
      // user.age = updatedUserData?.age ? updatedUserData.age : user.age;
      // user.isDeleted = updatedUserData.hasOwnProperty('isDeleted') ? updatedUserData.isDeleted : user.isDeleted;

      Object.assign(user, updatedUserData);

      await user.save();

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  /**
   * Soft deletes the user by converting its isDeleted property to true
   */
  static async deleteUserById(id) {
    try {
      const user = await UserService.getUserById(id);
      user.isDeleted = true;
      await user.save();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default UserService;
