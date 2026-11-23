const sequelize = require('./Bd.js').sequelize;
const { DataTypes } = require('sequelize');
const User = require('./User.js');
const Produto = require('./Produto.js');

const Venda = sequelize.define("Venda", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qtd: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precoTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    dataPedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
});

Venda.belongsTo(User, { foreignKey: 'id_user' });
Venda.belongsTo(Produto, { foreignKey: 'id_produto' });
User.hasMany(Venda, { foreignKey: 'id_user' });
Produto.hasMany(Venda, { foreignKey: 'id_produto' });

module.exports = Venda;