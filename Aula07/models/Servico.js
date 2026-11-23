
const sequelize = require('./Bd.js').sequelize;
const { DataTypes } = require('sequelize');

const Servico = sequelize.define("Servico", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    descricao: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

module.exports = Servico;
