import { DataTypes } from "sequelize";
import sequelize from "../config/sequelizeDB";

const PaymentOrder = sequelize.define(
    "PaymentOrder",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        paymentMethod: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        paymentStatus: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        totalPayment: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
    },
    {
        tableName: "payment_orders",
    }
);

export default PaymentOrder;
