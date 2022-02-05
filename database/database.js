const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', 'Kusarigama77_', {
    dialect: 'mysql',
    host: 'localhost'
});


module.exports= sequelize;