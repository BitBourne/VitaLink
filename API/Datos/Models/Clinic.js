import { DataTypes, Model } from 'sequelize';
import db from '../../Infraestructura/config/db.js';

class Clinic extends Model { }

Clinic.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: db,
    modelName: 'Clinic',
    tableName: 'clinics',
    timestamps: true,
});

export default Clinic;
