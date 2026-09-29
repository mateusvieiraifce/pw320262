const sequelize = require('../models/Bd.js').sequelize;
const { DataTypes} = require('sequelize')

const Cliente = sequelize.define("Cliente",{
    id:{ type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nome:{ type:DataTypes.STRING(30),
           allowNull:false,
    },
    endereco:{ type:DataTypes.STRING(100),
           allowNull:false,
    },

    telefone:{ type:DataTypes.STRING(30),
           allowNull:false,
    },
     email:{ type:DataTypes.STRING(30),
           allowNull:false,
    },
});
module.exports = Cliente;