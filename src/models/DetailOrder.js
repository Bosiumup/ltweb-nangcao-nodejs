import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeDB";

const DetailOrder = sequelize.define(
    "DetailOrder",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        price: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        size: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "detail_orders",
    }
);

export default DetailOrder;
