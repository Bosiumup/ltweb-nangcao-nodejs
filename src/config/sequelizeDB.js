import { Sequelize } from "sequelize";
// Tạo kết nối tới MySQL
const sequelize = new Sequelize("ltw_baocao", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
});

export default sequelize;
