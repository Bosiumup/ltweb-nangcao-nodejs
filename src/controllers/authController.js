import authService from "../services/authService";
let controllerGetMainPage = (req, res) => {
    res.redirect("/dashboard");
};
let controllerGetDashboard = async (req, res) => {
    let totalCountItemDashboard =
        await authService.serviceGetCountItemDashboard();

    return res.render("PAGE_Dashboard", {
        data: {
            listUsers: totalCountItemDashboard.listUsers,
            listProducts: totalCountItemDashboard.listProducts,
            listOrders: totalCountItemDashboard.listOrders,
            totalUsers: totalCountItemDashboard.totalCountUser,
            totalProducts: totalCountItemDashboard.totalCountProduct,
            totalOrders: totalCountItemDashboard.totalCountOrder,
        },
        session: req.session.user,
    });
};

let controllerGetLogin = (req, res) => {
    let message = req.query.message || null;
    let type = req.query.type || null;
    return res.render("PAGE_Login", {
        data: {
            successMessage: message,
            typeMessage: type,
        },
        session: req.session.user,
        layout: false,
    });
};

let controllerPostLogin = async (req, res) => {
    let { username, password } = req.body;

    // Gọi hàm login service và nhận kết quả
    let result = await authService.serviceAuthLogin(username, password);
    console.log("Session before:", req.session);

    // Kiểm tra kết quả trả về từ authLoginService
    if (result.user) {
        // Nếu trả về user (tức là login thành công)
        let user = result.user;
        if (user.role === "admin") {
            req.session.user = user;
            console.log("Session after:", req.session.user);
            return res.redirect("/dashboard");
        }
    } else {
        // Xử lý các trường hợp lỗi
        let message, type;
        if (result.error === "user_not_found") {
            message = "Tài khoản không tồn tại!";
            type = "error";
        } else if (result.error === "incorrect_password") {
            message = "Mật khẩu không đúng!";
            type = "error";
        }

        // Chuyển hướng về trang login với thông báo lỗi
        return res.redirect(
            `/PAGE_Login?message=${encodeURIComponent(message)}&type=${type}`
        );
    }
};

let controllerGetLogout = (req, res) => {
    req.session.destroy();
    console.log("Session after logout:", req.session);
    return res.redirect("/dashboard");
};

export default {
    controllerGetMainPage,
    controllerGetDashboard,
    controllerGetLogin,
    controllerPostLogin,
    controllerGetLogout,
};
