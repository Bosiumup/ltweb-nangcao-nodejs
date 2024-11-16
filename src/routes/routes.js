import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import upload from "../config/multerConfig";

const router = express.Router();

const initRoutes = (app) => {
    // -------------- Website routes

    // -------------- Render views
    // trang chủ
    router.get("/", authController.getMainPage);
    // trang dashboard
    router.get("/dashboard", authController.getDashboard);
    // trang đăng nhập
    router.get(
        "/PAGE_Login",
        authMiddleware.checkNotLoggedIn,
        authController.loginGet
    );
    // trang đăng ký và tạo người dùng
    router.get("/PAGE_Create_User", userController.createUserGet);
    // trang sửa thông tin người dùng và cập nhật thông tin người dùng
    router.get("/PAGE_Edit_User/:id", userController.controllerEditUserById);
    // trả về danh sách tài khoản
    router.get("/PAGE_List_User", userController.controllerGetAllUser);

    // -------------- Handle requests
    // đăng nhập
    router.post("/loginPost", authController.loginPost);
    // đăng xuất
    router.get("/logout", authController.logout);
    // tạo tài khoản
    router.post("/create-new-user", userController.controllerCreateNewUser);
    // xóa tài khoản
    router.post("/delete-user", userController.controllerDeleteUserById);
    // sửa tài khoản
    router.post("/update-user", userController.controllerUpdateUserById);
    router.post(
        "/update-avatar",
        upload.single("avatar"),
        userController.controllerUpdateAvatar
    );

    router.use((req, res) => {
        res.status(404).render("errs/PAGE_404", { layout: false });
    });
    app.use("/", router);
};

export default initRoutes;
