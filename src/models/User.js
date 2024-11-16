import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeDB";

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        fullname: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "users",
    }
);

export default User;
