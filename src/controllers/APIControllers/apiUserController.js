import userService from "../../services/APIServices/apiUserService";
import jwt from "jsonwebtoken";

let apiRegisterPost = async (req, res) => {
    let { username, password, fullname, phone } = req.body;
    if (!username || !password || !fullname || !phone) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Thiếu thông tin đăng ký!",
        });
    }
    let message = await userService.handleRegisterUser(req.body);
    return res.status(200).json(message);
};

let apiLoginPost = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            errCode: 1,
            errMessage: "Thiếu thông tin đăng nhập!",
        });
    }

    try {
        let message = await userService.handleUserLogin(username, password);

        if (message.errCode === 0) {
            // Tạo JWT và gửi userId trong payload
            const token = jwt.sign(
                {
                    userId: message.user.id,
                    username: message.user.username,
                    role: message.user.role,
                },
                "your-secret-key", // Chìa khóa bí mật của bạn
                { expiresIn: "1h" } // Thời gian hết hạn của token
            );

            return res.status(200).json({
                errCode: message.errCode,
                errMessage: message.errMessage,
                token: token, // Gửi token về cho client
                user: message.user, // Bạn cũng có thể gửi thêm thông tin user nếu cần
            });
        } else {
            return res.status(200).json({
                errCode: message.errCode,
                errMessage: message.errMessage,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

let apiDetailUserGet = async (req, res) => {
    let id = req.query.id;
    let message = await userService.handleGetUserById(id);
    return res.status(200).json(message);
};

let apiUpdateUserById = async (req, res) => {
    let message = await userService.handleUpdateUserById(req.body);
    return res.status(200).json(message);
};

let apiChangePassword = async (req, res) => {
    let message = await userService.handleChangePassword(req.body);
    return res.status(200).json(message);
};

let fetchGetUserInfo = async (req, res) => {
    let token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
    if (!token) {
        return res
            .status(401)
            .json({ errCode: 1, errMessage: "Không tìm thấy token!" });
    }
    try {
        // Giải mã token để lấy userId
        let decoded = await userService.verifyToken(token);
        console.log(decoded);
        // Lấy thông tin người dùng từ userId (lấy từ payload của token)
        let user = await userService.handleGetUserById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                errCode: 2,
                errMessage: "Không tìm thấy người dùng!",
                user: {},
            });
        }
        return res.status(200).json({
            errCode: 0,
            errMessage: "Lấy thông tin chi tiết người dùng thành công",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({ errCode: 3, errMessage: error.message });
    }
};

export default {
    apiDetailUserGet,
    apiLoginPost,
    apiRegisterPost,
    apiUpdateUserById,
    apiChangePassword,
    fetchGetUserInfo,
};
