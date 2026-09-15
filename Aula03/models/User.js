const sequelize = require('../models/Bd.js').sequelize;
const { DataTypes} = require('sequelize')

const User = sequelize.define("User",{
    id:{ type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nome:{ type:DataTypes.STRING(100),
           allowNull:false,
    },
    login:{ type:DataTypes.STRING(30),
           allowNull:false,
    },

    password:{ type:DataTypes.STRING(10),
           allowNull:false,
    }
});
exports.User = User;