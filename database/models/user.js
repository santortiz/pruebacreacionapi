const Sequelize = require('sequelize');

const sequelize= require('../database');


const user_table = sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true,
    },

    firstName: {
        type: Sequelize.STRING,
        allowNUll: false,
    },

    lastName: {
        type: Sequelize.STRING,
        allowNUll: false
    }
}, {
    freezeTableName: true
});


module.exports= user_table;