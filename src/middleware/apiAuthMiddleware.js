// checkAdmin: Kiểm tra nếu người dùng có quyền admin
let checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        next(); // Nếu là admin, tiếp tục xử lý
    } else {
        // Trả về errCode = 2 nếu không phải admin (Forbidden)
        return res.status(403).json({
            errCode: 2,
            errMessage: "Forbidden: Admins only",
        });
    }
};

// checkUser: Kiểm tra nếu người dùng có quyền user
let checkUser = (req, res, next) => {
    if (req.session.user && req.session.user.role === "user") {
        next(); // Nếu là user, tiếp tục xử lý
    } else {
        // Trả về errCode = 2 nếu không phải user (Forbidden)
        return res.status(403).json({
            errCode: 2,
            errMessage: "Forbidden: Users only",
        });
    }
};

// checkAdminOrUser: Kiểm tra nếu người dùng là admin hoặc user
let checkAdminOrUser = (req, res, next) => {
    if (
        req.session.user &&
        (req.session.user.role === "admin" || req.session.user.role === "user")
    ) {
        next(); // Nếu là admin hoặc user, tiếp tục xử lý
    } else {
        // Trả về errCode = 2 nếu không phải admin hoặc user (Forbidden)
        return res.status(403).json({
            errCode: 2,
            errMessage: "Forbidden: Admins or Users only",
        });
    }
};

// checkNotLoggedIn: Kiểm tra nếu người dùng chưa đăng nhập
let checkNotLoggedIn = (req, res, next) => {
    if (req.session.user) {
        // Trả về errCode = 3 nếu người dùng đã đăng nhập
        return res.status(403).json({
            errCode: 3,
            errMessage: "You are already logged in",
        });
    }
    next(); // Nếu chưa đăng nhập, tiếp tục xử lý
};

// checkAuthenticated: Kiểm tra người dùng đã đăng nhập hay chưa (dùng JWT hoặc session)
let checkAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        // Trả về errCode = 4 nếu chưa đăng nhập
        return res.status(401).json({
            errCode: 4,
            errMessage: "Unauthorized: Please log in",
        });
    }
    next(); // Nếu đã đăng nhập, tiếp tục xử lý
};

// Export các middleware để sử dụng trong các route khác
export default {
    checkAdmin,
    checkUser,
    checkAdminOrUser,
    checkNotLoggedIn,
    checkAuthenticated,
};
