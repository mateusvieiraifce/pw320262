const sequelize = require('./Bd.js').sequelize;
const { DataTypes } = require('sequelize');

const TipoProduto = sequelize.define("TipoProduto", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING(500),
        allowNull: true,
    }
});

module.exports = TipoProduto;