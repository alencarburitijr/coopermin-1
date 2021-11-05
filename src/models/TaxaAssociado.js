import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;
import { sequelize } from '../instances/mysql.js';

export const TaxaAssociado = sequelize.define("TaxaAssociado", {
    COD_TAXA: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    DATA_EMISSAO: {
        type: DataTypes.DATE,
    },
    REFERENCIA: {
        type: DataTypes.STRING
    },
    COD_CLIENTE: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'taxa_associado',
    timestamps: false
}); 