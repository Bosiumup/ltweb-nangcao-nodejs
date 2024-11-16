import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeDB";

const TypeProduct = sequelize.define(
    "TypeProduct",
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
    },
    {
        tableName: "type_products",
    }
);

export default TypeProduct;
