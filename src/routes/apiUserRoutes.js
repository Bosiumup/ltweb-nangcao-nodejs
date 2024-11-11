import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import apiUserController from "../controllers/apiUserController";

const router = express.Router();

const apiUserRoutes = (app) => {
    // // trang chủ
    // router.get("/", homeController);
    // // trang dashboard
    // router.get(
    //     "/dashboard",
    //     authMiddleware.checkAdmin,
    //     userController.dashboardGet
    // );
    // // trang đăng nhập
    // router.get(
    //     "/login",
    //     authMiddleware.checkNotLoggedIn,
    //     userController.loginGet
    // );
    // // trang đăng ký và tạo người dùng
    // router.get(
    //     "/create-user",
    //     authMiddleware.checkAdminOrUser,
    //     userController.createUserGet
    // );
    // // trang sửa thông tin người dùng và cập nhật thông tin người dùng
    // router.get(
    //     "/edit-user/:id",
    //     authMiddleware.checkAdminOrUser,
    //     userController.controllerEditUserById
    // );
    // // trả về danh sách tài khoản
    // router.get("/list-user", userController.controllerGetAllUser);
    // // trả về thông tin tài khoản cụ thể
    // router.get(
    //     "/detail-user",
    //     authMiddleware.checkUser,
    //     userController.detailUserGet
    // );
    // // tạo tài khoản
    // router.post("/create-new-user", userController.controllerCreateNewUser);
    // // xóa tài khoản
    // router.post(
    //     "/delete-user",
    //     authMiddleware.checkAdminOrUser,
    //     userController.controllerDeleteUserById
    // );
    // // sửa tài khoản
    // router.post(
    //     "/update-user",
    //     authMiddleware.checkAdminOrUser,
    //     userController.controllerUpdateUserById
    // );
    // // đăng nhập
    // router.post("/loginPost", userController.loginPost);
    // // đăng xuất
    // router.get(
    //     "/logout",
    //     authMiddleware.checkAdminOrUser,
    //     userController.logout
    // );

    // -------------- API routes

    // API người dùng

    // Đăng nhập
    router.post("/api/loginPost", apiUserController.apiLoginPost);
    // Đăng xuất
    router.get("/api/logoutPost", apiUserController.apiLogoutPost);
    // Trả về danh sách tài khoản
    router.get("/api/list-user", apiUserController.apiGetAllUser);
    // Trả về thông tin tài khoản cụ thể
    router.get("/api/detail-user/:id", apiUserController.apiDetailUserGet);
    // Tạo tài khoản
    router.post("/api/create-user", apiUserController.apiCreateNewUser);
    // Xóa tài khoản
    router.post("/api/delete-user", apiUserController.apiDeleteUserById);
    // Sửa tài khoản
    router.post("/api/update-user", apiUserController.apiUpdateUserById);

    app.use("/", router);
};

export default apiUserRoutes;
