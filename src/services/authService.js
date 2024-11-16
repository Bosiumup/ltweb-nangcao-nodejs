import bcrypt from "bcryptjs";
import User from "../models/User";

let authUser = async (username, password) => {
    let user = await getUsername(username);
    if (!user) {
        return { success: false, errMessage: "Tài khoản không tồn tại." };
    }
    let match = await bcrypt.compare(password, user.password);
    if (match) {
        delete user.password;
        return { success: true, user: user };
    } else {
        return { success: false, errMessage: "Mật khẩu không đúng." };
    }
};

export default authUser;
