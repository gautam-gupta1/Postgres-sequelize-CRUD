import  Sequelize from 'sequelize';
import sequelize from 'config';

const UserModel = sequelize.define('userdetails', {

    id : {
        type: Sequelize.UUID,
        primaryKey: true
    },
    login:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    age:{
        type: Sequelize.INTEGER
    },
    isdeleted:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }


}, { timestamps :false });

export default UserModel;
