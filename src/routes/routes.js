import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import userController from "../controllers/userController";
import authController from "../controllers/authController";
import productController from "../controllers/productController";
import orderController from "../controllers/orderController";
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
    // trả về danh sách tài khoản
    router.get("/PAGE_List_User", userController.controllerAllFunctionUser);
    // trang cấp tài khoản
    router.get("/PAGE_Create_User", userController.controllerGetCreateUser);
    // trang cập nhật thông tin
    router.get("/PAGE_Edit_User/:id", userController.controllerEditUserById);

    // -------------- Handle requests

    // -------------- Auth requests
    // đăng nhập
    router.post("/login", authController.controllerPostLogin);
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

    // -------------- Product requests
    // thêm sản phẩm
    router.post(
        "/create-new-product",
        productController.controllerCreateNewProduct
    );
    router.get(
        "/PAGE_Create_Product",
        productController.controllerGetCreateProduct
    );
    // xóa sản phẩm
    router.post(
        "/delete-product",
        productController.controllerDeleteProductById
    );
    // cập nhật sản phẩm
    router.post(
        "/update-product",
        productController.controllerUpdateProductById
    );
    router.post(
        "/update-image-product",
        upload.single("avatar"),
        productController.controllerUpdateAvatar
    );
    router.get(
        "/PAGE_Edit_Product/:id",
        productController.controllerEditProductById
    );
    // Lấy danh sách sản phẩm
    router.get(
        "/PAGE_List_Product",
        productController.controllerAllFunctionProduct
    );

    // -------------- Order requests
    router.get("/PAGE_List_Order", orderController.controllerAllOrder);
    router.get("/PAGE_Detail_Order/:id", orderController.controllerDetailOrder);
    router.get("/PAGE_Edit_Order/:id", orderController.controllerEditOrder);
    router.post("/update-order", orderController.controllerUpdateOrder);

    // -------------- Page not found
    router.use((req, res) => {
        res.status(404).render("errs/PAGE_404", { layout: false });
    });

    // -------------- Đường dẫn / trỏ đến router
    app.use("/", router);
};

export default initRoutes;
