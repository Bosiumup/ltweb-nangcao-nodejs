import bcrypt from "bcryptjs";

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
        let [rows, fields] = await pool.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        delete rows[0].password;
        return rows[0];
    } catch (error) {
        return error;
    }
};

let checkUsername = async (username) => {
    try {
        let [rows, fields] = await pool.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );
        if (rows[0].length > 0) {
            return true;
        } else {
            return false;
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

let getAllUsers = async () => {
    try {
        let [rows] = await pool.query(
            "SELECT * FROM users WHERE role = 'user'"
        );
        if (rows.length === 0) {
            return { errCode: 1, errMessage: "Không tìm thấy người dùng!" };
        } else {
            rows.forEach((user) => delete user.password);
            return {
                errCode: 0,
                errMessage: "Lấy danh sách người dùng thành công!",
                data: rows,
            };
        }
    } catch (error) {
        return error;
    }
};

let handleCreateNewUser = async (data) => {
    try {
        let check = await checkUsername(data.username);
        if (check) {
            return {
                errCode: 1,
                errMessage: "Tài khoản đã tồn tại trong hệ thống!",
            };
        } else {
            let hashPassword = await hashUserPassword(data.password);
            await pool.query(
                "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                [username, hashPassword, "user"]
            );
            return {
                errCode: 0,
                errMessage: "Thêm người dùng mới thành công!",
            };
        }
    } catch (error) {
        return error;
    }
};

let handleDeleteUserById = async (id) => {
    try {
        await pool.query("DELETE FROM users WHERE id = ?", [id]);
        return {
            errCode: 0,
            errMessage: "Xóa người dùng thành công!",
        };
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
    getAllUsers,
    handleUserLogin,
    handleCreateNewUser,
    handleDeleteUserById,
    handleUpdateUserById,
};
