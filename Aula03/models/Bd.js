const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize("pw3","root","root",{
    host:"localhost",
    dialect:"mysql",
    logging:false

});


exports.sequelize = sequelize;