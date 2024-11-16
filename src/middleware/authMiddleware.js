let checkAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        next();
    } else {
        return res.redirect("/login");
    }
};

let checkNotLoggedIn = (req, res, next) => {
    if (req.session.user && req.session.user.role === "admin") {
        return res.redirect("/dashboard");
    }
    next();
};

export default { checkAdmin, checkNotLoggedIn };
