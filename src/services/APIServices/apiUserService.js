import bcrypt from "bcryptjs";
import User from "../../models/User";
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

let handleGetUserById = async (userId) => {
    try {
        let user = await User.findOne({ where: { id: userId } });
        user = user.toJSON();
        delete user.password;
        return user;
    } catch (error) {
        throw new Error("Không thể tìm thấy người dùng");
    }
};

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
        if (!data || !data.id) {
            return {
                errCode: 1,
                errMessage: "Thiếu thông tin cần thiết hoặc ID không hợp lệ!",
            };
        }

        // Cập nhật thông tin người dùng
        let [updateCount] = await User.update(
            {
                fullname: data.fullname,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
            },
            {
                where: { id: data.id }, // Kiểm tra ID trước khi truyền vào query
            }
        );

        if (updateCount === 0) {
            return {
                errCode: 2,
                errMessage: "Không tìm thấy người dùng với ID này!",
            };
        }

        // Lấy lại thông tin người dùng sau khi cập nhật
        let updatedUser = await User.findOne({
            where: { id: data.id },
        });

        return {
            errCode: 0,
            errMessage: "Cập nhật thông tin người dùng thành công!",
            user: updatedUser, // Trả về thông tin người dùng đã cập nhật
        };
    } catch (error) {
        return {
            errCode: 3,
            errMessage: "Có lỗi xảy ra khi cập nhật thông tin người dùng.",
            error: error.message,
        };
    }
};

let handleChangePassword = async (data) => {
    try {
        if (!data || !data.id || !data.oldPassword || !data.newPassword) {
            return {
                errCode: 1,
                errMessage: "Thiếu thông tin cần thiết!",
            };
        }

        // Find the user by ID
        const user = await User.findOne({ where: { id: data.id } });

        if (!user) {
            return {
                errCode: 2,
                errMessage: "Không tìm thấy người dùng với ID này!",
            };
        }

        // Verify the old password (you'll need to hash passwords securely)
        const isPasswordValid = await bcrypt.compare(
            data.oldPassword,
            user.password
        );

        if (!isPasswordValid) {
            return {
                errCode: 3,
                errMessage: "Mật khẩu cũ không chính xác!",
            };
        }

        // Hash the new password
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(data.newPassword, salt);

        // Update the user's password
        await User.update(
            { password: hashedPassword },
            { where: { id: data.id } }
        );

        return {
            errCode: 0,
            errMessage: "Cập nhật mật khẩu thành công!",
        };
    } catch (error) {
        return {
            errCode: 4,
            errMessage: "Có lỗi xảy ra khi cập nhật mật khẩu.",
            error: error.message,
        };
    }
};

export default {
    verifyToken,
    handleGetUserById,
    handleRegisterUser,
    handleUserLogin,
    handleUpdateUserById,
    handleChangePassword,
};
