import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import upload from "../config/multerConfig";

const router = express.Router();

const initRoutes = (app) => {
    // -------------- Website routes

    // -------------- Render views

    // -------------- Auth views
    // trang chủ
    router.get("/", authController.controllerGetMainPage);
    // trang dashboard
    router.get("/dashboard", authController.controllerGetDashboard);
    // trang đăng nhập
    router.get(
        "/PAGE_Login",
        authMiddleware.checkNotLoggedIn,
        authController.controllerGetLogin
    );

    // -------------- User views
    // trang cấp tài khoản
    router.get("/PAGE_Create_User", userController.controllerGetCreateUser);
    // trang cập nhật thông tin
    router.get("/PAGE_Edit_User/:id", userController.controllerEditUserById);
    // trả về danh sách tài khoản
    router.get("/PAGE_List_User", userController.controllerGetAllUser);

    // -------------- Handle requests

    // -------------- Auth requests
    // đăng nhập
    router.post("/login", authController.controlerPostLogin);
    // đăng xuất
    router.get("/logout", authController.controllerGetLogout);

    // -------------- User requests
    // tạo tài khoản
    router.post("/create-new-user", userController.controllerCreateNewUser);
    // xóa tài khoản
    router.post("/delete-user", userController.controllerDeleteUserById);
    // cập nhật tài khoản
    router.post("/update-user", userController.controllerUpdateUserById);
    router.post(
        "/update-avatar",
        upload.single("avatar"),
        userController.controllerUpdateAvatar
    );
    router.get("/PAGE_List_User/:sort", userController.controllerOrderUser);

    // -------------- Product requests
    // -------------- Order requests

    // -------------- Page not found
    router.use((req, res) => {
        res.status(404).render("errs/PAGE_404", { layout: false });
    });

    // -------------- Đường dẫn / trỏ đến router
    app.use("/", router);
};

export default initRoutes;
