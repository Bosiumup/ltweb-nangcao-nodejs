import userService from "../../services/APIServices/apiUserService";

let apiLoginPost = async (req, res) => {
    let { username, password } = req.body;
    if (!username || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: "Thiếu thông tin đăng nhập!",
        });
    }
    let message = await userService.handleUserLogin(username, password);
    req.session.user = message.user;
    let session = req.session.user;
    return res.status(200).json({
        message,
        session,
    });
};

let apiLogoutPost = (req, res) => {
    req.session.destroy(() => {
        // Xóa cookie ở client chứa session ID (connect.sid là cookie mặc định của express-session)
        res.clearCookie("connect.sid", { httpOnly: true, secure: false });
        return res.status(200).json({
            errCode: 0,
            errMessage: "Đăng xuất thành công!",
        });
    });
};

let apiDetailUserGet = async (req, res) => {
    let id = req.query.id;
    let message = await userService.getUserById(id);
    return res.status(200).json(message);
};

let apiCreateNewUser = async (req, res) => {
    let message = await userService.handleCreateNewUser(req.body);
    return res.status(200).json(message);
};

let apiUpdateUserById = async (req, res) => {
    let message = await userService.handleUpdateUserById(req.body);
    return res.status(200).json(message);
};

export default {
    apiDetailUserGet,
    apiLoginPost,
    apiLogoutPost,
    apiCreateNewUser,
    apiUpdateUserById,
};
