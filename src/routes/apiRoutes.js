import express from "express";
import apiUserController from "../controllers/APIControllers/apiUserController";

const router = express.Router();

const initApiRoutes = (app) => {
    // -------------- API routes

    // API người dùng

    // Đăng nhập
    router.post("/api/loginPost", apiUserController.apiLoginPost);
    // Đăng xuất
    router.post("/api/logoutPost", apiUserController.apiLogoutPost);
    // Trả về thông tin tài khoản cụ thể
    router.get("/api/detail-user/:id", apiUserController.apiDetailUserGet);
    // Tạo tài khoản
    router.post("/api/create-user", apiUserController.apiCreateNewUser);
    // Sửa tài khoản
    router.put("/api/update-user", apiUserController.apiUpdateUserById);

    // API sản phẩm

    // Hiển thị nhóm
    // router.get("/api/groupProduct", apiProductController.apiGetGroupProduct);
    // // Hiển thị danh sách các sản phẩm
    // router.get("/api/listProduct", apiProductController.apiGetAllProduct);
    // // Hiển thị chi tiết sản phẩm cụ thể
    // router.get("/api/detailProduct", apiProductController.apiGetDetailProduct);

    app.use("/", router);
};

export default initApiRoutes;
