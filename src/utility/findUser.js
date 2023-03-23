import { getAllUsers } from 'database/userDb.js';

const findUser = (id) => {
    const user = getAllUsers().find((ele) => ele.id === id);
    return user;
};


export default findUser;
