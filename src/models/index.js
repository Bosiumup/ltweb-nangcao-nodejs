import sequelize from "../config/sequelizeDB";
import { DataTypes } from "sequelize";
import User from "./User";
import Product from "./Product";
import Order from "./Order";
import TypeProduct from "./TypeProduct";
import DetailOrder from "./DetailOrder";
import Cart from "./Cart";
import PaymentOrder from "./PaymentOrder";
import RatingProduct from "./RatingProduct";
import DetailProduct from "./DetailProduct";

// Mối quan hệ giữa Product và TypeProduct
TypeProduct.hasMany(Product, {
    foreignKey: "id_type_product",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Product.belongsTo(TypeProduct, {
    foreignKey: "id_type_product",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Mối quan hệ giữa Product và RatingProduct
Product.hasMany(RatingProduct, {
    foreignKey: "id_product",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
RatingProduct.belongsTo(Product, { foreignKey: "id_product" });

// Mối quan hệ giữa User và RatingProduct
User.hasMany(RatingProduct, {
    foreignKey: "id_user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
RatingProduct.belongsTo(User, { foreignKey: "id_user" });

// Mối quan hệ giữa Product và DetailProduct
Product.hasMany(DetailProduct, {
    foreignKey: "id_product",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
DetailProduct.belongsTo(Product, { foreignKey: "id_product" });

// Mối quan hệ giữa Cart và Product
Product.hasMany(Cart, {
    foreignKey: "id_product",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Cart.belongsTo(Product, {
    foreignKey: "id_product",
});

// Mối quan hệ giữa Product và DetailOrder
Product.hasMany(DetailOrder, {
    foreignKey: "id_product",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
DetailOrder.belongsTo(Product, { foreignKey: "id_product" });

// Mối quan hệ giữa Order và DetailOrder
Order.hasMany(DetailOrder, {
    foreignKey: "id_order",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
DetailOrder.belongsTo(Order, { foreignKey: "id_order" });

// Mối quan hệ giữa Order và PaymentOrder
Order.hasOne(PaymentOrder, {
    foreignKey: "id_order",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
PaymentOrder.belongsTo(Order, { foreignKey: "id_order" });

// Mối quan hệ giữa Order và User
User.hasMany(Order, {
    foreignKey: "id_user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Order.belongsTo(User, { foreignKey: "id_user" });

// Khởi tạo các mô hình
const initModels = async () => {
    try {
        await sequelize.authenticate();
        console.log("Kết nối tới cơ sở dữ liệu thành công!");

        // const queryInterface = sequelize.getQueryInterface();
        // await queryInterface.addColumn("users", "gender", {
        //     type: DataTypes.STRING(255),
        //     allowNull: true,
        // });
        // console.log(
        //     "Trường 'gender' đã được thêm vào bảng 'users' thành công!"
        // );

        // const queryInterface = sequelize.getQueryInterface();
        // await queryInterface.removeColumn("detail_products", "price");
        // console.log(
        //     "Trường 'price' đã được xóa khỏi bảng 'detail_products' thành công!"
        // );

        // Đồng bộ các mô hình
        // await sequelize.sync({ force: true });
    //     await sequelize.sync();
    //     console.log("Các mô hình đã được đồng bộ!");
    } catch (error) {
        console.error("Lỗi kết nối cơ sở dữ liệu:", error);
    }
};

export {
    initModels,
    User,
    Product,
    Order,
    TypeProduct,
    DetailOrder,
    Cart,
    PaymentOrder,
    RatingProduct,
    DetailProduct,
};
