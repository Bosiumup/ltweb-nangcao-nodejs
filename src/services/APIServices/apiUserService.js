import bcrypt from "bcryptjs";
<<<<<<< HEAD
import User from "../../models/User";
<<<<<<< HEAD
import jwt from "jsonwebtoken";

let verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "your-secret-key", (err, decoded) => {
            if (err) {
                reject(new Error("Token không hợp lệ!"));
            } else {
                resolve(decoded); // Trả về thông tin giải mã từ token (bao gồm userId)
            }
        });
    });
};

let getUserById = async (userId) => {
    try {
        let user = await User.findByPk(userId); // Giả sử bạn đang dùng Sequelize để tìm người dùng theo id
        return user; // Trả về thông tin người dùng
    } catch (error) {
        throw new Error("Không thể tìm thấy người dùng");
    }
};
=======
=======
// import User from "../models/User";
>>>>>>> 0c616ddf7426e8cb0d1c03c3e312530c41bd820f
>>>>>>> maico

let handleRegisterUser = async (data) => {
    try {
        let check = await User.findOne({ where: { username: data.username } });
        if (check) {
            return {
                errCode: 1,
                errMessage: "Tài khoản đã tồn tại trong hệ thống!",
            };
        } else {
            let salt = bcrypt.genSaltSync(10);
            let hashPassword = bcrypt.hashSync(data.password, salt);
            await User.create({
                username: data.username,
                password: hashPassword,
                fullname: data.fullname,
                phone: data.phone,
                role: "user",
            });
            return {
                errCode: 0,
                errMessage: "Đăng ký thành thành công!",
            };
        }
    } catch (error) {
        return error;
    }
};

let handleUserLogin = async (username, password) => {
    try {
        let userData = {};
        let checkUsername = await User.findOne({
            where: { username: username },
        });
        if (checkUsername) {
            let user = await User.findOne({ where: { username: username } });
            if (user) {
                let match = await bcrypt.compare(password, user.password);
                if (match) {
                    userData.errCode = 0;
                    userData.errMessage = "Khớp mật khẩu!";
                    userData.user = user.toJSON();
                    delete userData.user.password;
                } else {
                    userData.errCode = 1;
                    userData.errMessage = "Sai mật khẩu!";
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = "Không tìm thấy người dùng!";
            }
        } else {
            userData.errCode = 3;
            userData.errMessage =
                "Tài khoản không có sẵn trong hệ thống. Vui lòng thử lại bằng tài khoản khác!";
        }
        return userData;
    } catch (error) {
        return error;
    }
};

let handleUpdateUserById = async (data) => {
    try {
        if (!data.id || !data.fullname || !data.address || !data.email) {
            return {
                errCode: 1,
                errMessage: "Thiếu thông tin cần thiết!",
            };
        }
        await pool.query(
            "UPDATE users SET fullname = ?, address = ?, email = ? WHERE id = ?",
            [data.fullname, data.address, data.email, data.id]
        );
        return {
            errCode: 0,
            errMessage: "Cập nhật thông tin người dùng thành công!",
        };
    } catch (error) {
        return error;
    }
};

export default {
    verifyToken,
    getUserById,
    handleRegisterUser,
    handleUserLogin,
    handleUpdateUserById,
};
