import express from 'express';
import { createUser, deleteUser, getEveryUser, getAutoSuggestUsers, getUserWithId, updateUser } from 'controllers/user.js';
const router = express.Router();


router.route('/user/:id').get(getUserWithId);

router.route('/user/create').post(createUser);

router.route('/user/update/:id').put(updateUser);

router.route('/user/delete/:id').delete(deleteUser);

router.route('/getAutoSuggestUsers').get(getAutoSuggestUsers);

router.route('/getAllUsers').get(getEveryUser);

export default router;
