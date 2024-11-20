import express from "express";
import apiUserController from "../controllers/APIControllers/apiUserController";
import apiProductController from "../controllers/APIControllers/apiProductController";
import apiCartController from "../controllers/APIControllers/apiCartController";
const router = express.Router();

const initApiRoutes = (app) => {
    // -------------- API routes

    // API người dùng
    // Token lấy từ header
    router.get("/api/fetchGetUserInfo", apiUserController.fetchGetUserInfo);
    // Đăng ký tài khoản
    router.post("/api/registerPost", apiUserController.apiRegisterPost);
    // Đăng nhập
    router.post("/api/loginPost", apiUserController.apiLoginPost);
    // Đăng xuất
    // router.post("/api/logoutPost", apiUserController.apiLogoutPost);

    // Trả về thông tin tài khoản cụ thể
    router.get("/api/detail-user/:id", apiUserController.apiDetailUserGet);

    // Sửa tài khoản
    router.put("/api/update-user", apiUserController.apiUpdateUserById);
    // API sản phẩm
    router.get("/api/list-product", apiProductController.apigetAllProduct);
    router.get("/api/list-type", apiProductController.apigetTypeProduct);
    router.get(
        "/api/list-product/:id",
        apiProductController.apigetProductFromType
    );

    //API giỏ hàng
    router.post("/api/add-cart", apiCartController.apiaddCart)
    // Hiển thị nhóm
    // router.get("/api/groupProduct", apiProductController.apiGetGroupProduct);
    // // Hiển thị danh sách các sản phẩm
    // router.get("/api/listProduct", apiProductController.apiGetAllProduct);
    // // Hiển thị chi tiết sản phẩm cụ thể
    // router.get("/api/detailProduct", apiProductController.apiGetDetailProduct);

    app.use("/", router);
};

export default initApiRoutes;
