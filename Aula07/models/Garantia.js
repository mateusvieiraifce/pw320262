const sequelize = require('./Bd.js').sequelize;
const { DataTypes } = require('sequelize');
const Cliente = require('./Cliente.js');
const Servico = require('./Servico.js');

const Garantia = sequelize.define("Garantia", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dataInicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    dataFim: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
});

Cliente.hasMany(Garantia, { foreignKey: "clienteId" });
Garantia.belongsTo(Cliente, { foreignKey: "clienteId" });

Servico.hasMany(Garantia, { foreignKey: "servicoId" });
Garantia.belongsTo(Servico, { foreignKey: "servicoId" });

module.exports = Garantia;