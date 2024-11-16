import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeDB";

const RatingProduct = sequelize.define(
    "RatingProduct",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        comment: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "rating_products",
    }
);

export default RatingProduct;
