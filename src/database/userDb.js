export const userDb = [{
    'id': '23ab7643-9b74-4eff-aaa6-845e94024b1d',
    'login': 'gautamg@gmail.com',
    'password': '123abcABC',
    'age': 21,
    'isDeleted': false
}];

export const addUser = (user) => {
    userDb.push(user);
};

export const getAllUsers = () => {
    return userDb;
};

