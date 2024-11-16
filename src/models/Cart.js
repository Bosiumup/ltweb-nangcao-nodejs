import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeDB";

const Cart = sequelize.define(
    "Cart",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        price: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        quantity: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        size: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "cart",
    }
);

export default Cart;
