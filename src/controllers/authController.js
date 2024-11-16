import userModel from "../services/userService";

let getMainPage = (req, res) => {
    res.redirect("/dashboard");
};
let getDashboard = (req, res) => {
    return res.render("PAGE_Dashboard", { session: req.session.user });
};

let loginGet = (req, res) => {
    let message = req.query.message || null;
    let errMessage = req.query.errMessage || null;
    return res.render("PAGE_Login", {
        session: req.session.user,
        successMessage: message,
        errMessage: errMessage,
        layout: false,
    });
};

let loginPost = async (req, res) => {
    let { username, password } = req.body;
    let result = await userModel.authUser(username, password);
    console.log("Session before:", req.session);
    if (result.success) {
        let user = result.user;
        if (user.role === "admin") {
            req.session.user = user;
            console.log("Session after:", req.session.user);
            return res.redirect("/dashboard");
        }
        if (user.role === "user") {
            req.session.user = user;
            console.log("Session after:", req.session.user);
            return res.redirect("/");
        }
    } else {
        return res.redirect(`/login?errMessage=${result.errMessage}`);
    }
};

let logout = (req, res) => {
    req.session.destroy();
    console.log("Session after logout:", req.session);
    return res.redirect("/login");
};

export default { getMainPage, getDashboard, loginGet, loginPost, logout };
