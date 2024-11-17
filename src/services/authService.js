import bcrypt from "bcryptjs";
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

export default serviceAuthLogin;
