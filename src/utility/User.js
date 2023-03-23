import { v4 as uuidv4 } from 'uuid';
class User {
    constructor(login, password, age) {
        this.id = uuidv4();
        this.login = login;
        this.password = password;
        this.age = age;
        this.isDeleted = false;
    }
}
export default User;
