const sequelize = require('./Bd.js').sequelize;
const { DataTypes} = require('sequelize')

const Fornecedor = sequelize.define("Fornecedore",{
    id:{ type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nome:{ type:DataTypes.STRING(100),
           allowNull:false,
    },
    endereco:{ type:DataTypes.STRING(100),
           allowNull:false,
    },
    cnpj:{ type:DataTypes.STRING(20),
           allowNull:false,
    },
    ie:{ type:DataTypes.STRING(10),
           allowNull:false,
    },

    telefone:{ type:DataTypes.STRING(30),
           allowNull:false,
    },
     email:{ type:DataTypes.STRING(30),
           allowNull:false,
    },
});
exports.Fornecedor = Fornecedor;