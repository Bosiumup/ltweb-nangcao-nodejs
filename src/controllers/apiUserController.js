import userModel from "../services/userService";

let apiDetailUserGet = async (req, res) => {
    let id = req.params.id;
    try {
        let dataUser = await userModel.modelGetUserById(id);
        if (dataUser) {
            return res.json({
                success: true,
                errCode: 1,
                user: dataUser,
            });
        } else {
            return res.json({
                success: false,
                errCode: 2,
                errMessage: "Không tìm thấy người dùng.",
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi khi truy vấn dữ liệu người dùng.",
        });
    }
};

let apiLoginPost = async (req, res) => {
    let { username, password } = req.body;
    try {
        let result = await userModel.authUser(username, password);
        if (result.success) {
            let user = result.user;
            req.session.user = user;
            return res.json({
                success: true,
                errCode: 1,
                message:
                    user.role === "admin"
                        ? "Đăng nhập thành công với quyền admin."
                        : "Đăng nhập thành công với quyền user.",
                user,
            });
        } else {
            return res.json({
                success: false,
                errCode: 2,
                errMessage: result.errMessage,
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi hệ thống khi đăng nhập.",
        });
    }
};

let apiLogoutPost = (req, res) => {
    req.session.destroy();
    return res.json({
        success: true,
        errCode: 1,
        message: "Đã đăng xuất thành công.",
    });
};

let apiGetAllUser = async (req, res) => {
    try {
        let users = await userModel.modelGetAllUser();
        return res.json({
            success: true,
            errCode: 1,
            users: users,
        });
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi khi lấy danh sách người dùng.",
        });
    }
};

let apiCreateNewUser = async (req, res) => {
    let { username, password } = req.body;
    try {
        let created = await userModel.modelCreateNewUser(username, password);
        if (!created) {
            return res.json({
                success: false,
                errCode: 2,
                errMessage: "Tài khoản đã có sẵn.",
            });
        } else {
            return res.json({
                success: true,
                errCode: 1,
                message: "Tạo người dùng thành công.",
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi hệ thống khi tạo tài khoản.",
        });
    }
};

let apiDeleteUserById = async (req, res) => {
    let { userId } = req.body;
    try {
        await userModel.modelDeleteUserById(userId);
        return res.json({
            success: true,
            errCode: 1,
            message: "Xóa người dùng thành công.",
        });
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi hệ thống khi xóa người dùng.",
        });
    }
};

let apiUpdateUserById = async (req, res) => {
    let { id, fullname, address, email } = req.body;
    try {
        await userModel.modelUpdateUserById(id, fullname, address, email);
        return res.json({
            success: true,
            errCode: 1,
            message: "Cập nhật người dùng thành công.",
        });
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi hệ thống khi cập nhật người dùng.",
        });
    }
};

export default {
    apiDetailUserGet,
    apiLoginPost,
    apiLogoutPost,
    apiGetAllUser,
    apiCreateNewUser,
    apiDeleteUserById,
    apiUpdateUserById,
};

// import userModel from "../services/userModel";

// let dashboardGet = (req, res) => {
//     return res.render("dashboard", { session: req.session.user });
// };

// let detailUserGet = async (req, res) => {
//     let username = req.session.user.username;
//     let message = req.query.message || null;
//     let dataUser = await userModel.getUsername(username);
//     return res.render("detailUser", {
//         user: dataUser,
//         session: req.session.user,
//         successMessage: message,
//     });
// };

// let loginGet = (req, res) => {
//     let message = req.query.message || null;
//     let errMessage = req.query.errMessage || null;
//     return res.render("login", {
//         session: req.session.user,
//         successMessage: message,
//         errMessage: errMessage,
//     });
// };

// let loginPost = async (req, res) => {
//     let { username, password } = req.body;
//     let result = await userModel.authUser(username, password);
//     console.log("Session before:", req.session);
//     if (result.success) {
//         let user = result.user;
//         if (user.role === "admin") {
//             req.session.user = user;
//             console.log("Session after:", req.session.user);
//             return res.redirect("/dashboard");
//         }
//         if (user.role === "user") {
//             req.session.user = user;
//             console.log("Session after:", req.session.user);
//             return res.redirect("/");
//         }
//     } else {
//         return res.redirect(`/login?errMessage=${result.errMessage}`);
//     }
// };

// let logout = (req, res) => {
//     req.session.destroy();
//     console.log("Session after logout:", req.session);
//     return res.redirect("/login");
// };

// let controllerGetAllUser = async (req, res) => {
//     let users = await userModel.modelGetAllUser();
//     let message = req.query.message || null;
//     return res.render("listUser", {
//         data: {
//             title: "Danh sách người dùng",
//             users: users,
//             successMessage: message,
//         },
//         session: req.session.user,
//     });
// };

// let createUserGet = (req, res) => {
//     res.render("createUser", {
//         title: "Tạo tài khoản người dùng",
//         errorMessage: null,
//         session: req.session.user,
//     });
// };

// let controllerCreateNewUser = async (req, res) => {
//     let { username, password } = req.body;
//     let created = await userModel.modelCreateNewUser(username, password);
//     if (!created) {
//         return res.render("createUser", {
//             title: "Tạo tài khoản người dùng",
//             errorMessage: "Tài khoản đã có sẵn.",
//             session: req.session.user,
//         });
//     } else {
//         if (req.session.user && req.session.user.role === "admin") {
//             return res.redirect(
//                 "/list-user?message=Tạo người dùng thành công."
//             );
//         } else {
//             return res.redirect("/login?message=Đăng ký tài khoản thành công.");
//         }
//     }
// };

// let controllerDeleteUserById = async (req, res) => {
//     let { userId } = req.body;
//     await userModel.modelDeleteUserById(userId);
//     if (req.session.user && req.session.user.role === "admin") {
//         return res.redirect("/list-user?message=Xóa người dùng thành công.");
//     }
//     if (req.session.user && req.session.user.role === "user") {
//         req.session.destroy();
//         return res.redirect("/login?message=Xóa người dùng thành công.");
//     }
// };

// let controllerEditUserById = async (req, res) => {
//     let { id } = req.params;
//     let dataUser = await userModel.modelGetUserById(id);
//     return res.render("editUser", {
//         data: { title: "Cập nhật thông tin", user: dataUser },
//         session: req.session.user,
//     });
// };

// let controllerUpdateUserById = async (req, res) => {
//     let { id, fullname, address, email } = req.body;
//     await userModel.modelUpdateUserById(id, fullname, address, email);
//     if (req.session.user && req.session.user.role === "admin") {
//         return res.redirect(
//             "/list-user?message=Cập nhật người dùng thành công."
//         );
//     }
//     if (req.session.user && req.session.user.role === "user") {
//         return res.redirect(
//             "/detail-user?message=Cập nhật người dùng thành công."
//         );
//     }
// };

// export default {
//     controllerGetAllUser,
//     createUserGet,
//     controllerCreateNewUser,
//     controllerDeleteUserById,
//     controllerEditUserById,
//     controllerUpdateUserById,
//     dashboardGet,
//     detailUserGet,
//     loginGet,
//     loginPost,
//     logout,
// };
