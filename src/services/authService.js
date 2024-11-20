import bcrypt from "bcryptjs";
import User from "../models/User";
import Product from "../models/Product";
import Order from "../models/Order";
import userService from "./userService";

let serviceAuthLogin = async (username, password) => {
    // Tìm người dùng theo tên tài khoản
    let user = await userService.serviceGetUsername(username);
    if (!user) {
        // Trả về một giá trị đặc biệt khi không tìm thấy tài khoản
        return { error: "user_not_found" };
    }

    // Kiểm tra mật khẩu
    let match = await bcrypt.compare(password, user.password);
    if (match) {
        delete user.password; // Xóa mật khẩu trước khi trả về
        return { user: user }; // Trả về đối tượng user nếu mật khẩu đúng
    } else {
        // Nếu mật khẩu không khớp
        return { error: "incorrect_password" };
    }
};

let serviceGetCountItemDashboard = async () => {
    let totalCountUser = await User.count({ where: { role: "user" } });
    let totalCountProduct = await Product.count();
    let totalCountOrder = await Order.count();
    let listUsers = await User.findAll({
        where: { role: "user" },
        order: [["id", "DESC"]],
        limit: 5,
    });
    let listProducts = await Product.findAll(
        { limit: 5 },
        { order: [["id", "DESC"]] }
    );
    let listOrders = await Order.findAll(
        { limit: 5 },
        { order: [["id", "DESC"]] }
    );
    return {
        listUsers,
        listProducts,
        listOrders,
        totalCountUser,
        totalCountProduct,
        totalCountOrder,
    };
};

export default { serviceAuthLogin, serviceGetCountItemDashboard };
