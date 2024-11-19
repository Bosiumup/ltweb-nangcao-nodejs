import bcrypt from "bcryptjs";
// import User from "../models/User";

let handleRegisterUser = async (data) => {
    try {
        let check = await checkUsername(data.username);
        if (check) {
            return {
                errCode: 1,
                errMessage: "Tài khoản đã tồn tại trong hệ thống!",
            };
        } else {
            let hashPassword = await hashUserPassword(data.password);
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

let hashUserPassword = async (password) => {
    try {
        let salt = bcrypt.genSaltSync(10);
        return await bcrypt.hashSync(password, salt);
    } catch (error) {
        return error;
    }
};

let handleUserLogin = async (username, password) => {
    try {
        let userData = {};
        let checkUsername = await checkUsername(username);
        if (checkUsername) {
            let user = await getUsername(username);
            if (user) {
                let match = await bcrypt.compare(password, user.password);
                if (match) {
                    userData.errCode = 0;
                    userData.errMessage = "Khớp mật khẩu!";
                    delete user.password;
                    userData.user = user;
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

let getUsername = async (username) => {
    try {
        let user = await User.findOne({ where: { username } });
        delete user.password;
        return user;
    } catch (error) {
        return error;
    }
};

let checkUsername = async (username) => {
    try {
        let user = await User.findOne({ where: { username } });
        if (user.length > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
};

let getUserById = async (id) => {
    try {
        let [rows, fields] = await pool.query(
            "SELECT * FROM users WHERE id = ?",
            [id]
        );
        delete rows[0].password;
        return rows[0];
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
    checkUsername,
    getUsername,
    getUserById,
    handleUserLogin,
    handleRegisterUser,
    handleUpdateUserById,
};
