import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeDB";

const DetailProduct = sequelize.define(
    "DetailProduct",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        size: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        stock: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "detail_products",
    }
);

export default DetailProduct;
