import { Sequelize } from "sequelize";


const sequelize = new Sequelize('users', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
