import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeDB";

const Product = sequelize.define(
    "Product",
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
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "products",
    }
);

export default Product;
