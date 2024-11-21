import express from "express";
import apiUserController from "../controllers/APIControllers/apiUserController";
import apiTypeProduct from "../controllers/APIControllers/apiTypeProduct";
const router = express.Router();

const initApiRoutes = (app) => {
    // -------------- API routes
    // API người dùng
    // Đăng nhập
    router.post("/api/loginPost", apiUserController.apiLoginPost);
    // Đăng xuất
    // router.post("/api/logoutPost", apiUserController.apiLogoutPost);

    // Trả về thông tin tài khoản cụ thể
    router.get("/api/detail-user/:id", apiUserController.apiDetailUserGet);

    // Sửa tài khoản
    router.put("/api/update-user", apiUserController.apiUpdateUserById);
    // API sản phẩm
    // Hiển thị nhóm
    // router.get("/api/groupProduct", apiProductController.apiGetGroupProduct);
    // // Hiển thị danh sách các sản phẩm
    // router.get("/api/listProduct", apiProductController.apiGetAllProduct);
    // // Hiển thị chi tiết sản phẩm cụ thể
    // router.get("/api/detailProduct", apiProductController.apiGetDetailProduct);
    // api thêm loại sản phẩm mới
    // router.post("/api/addProduct",apiAddTypeProduct.apiaddTypeProduct); 
     // API thêm loại sản phẩm
     router.post('/api/add-type-product',apiTypeProduct.apiAddTypeProduct);
     router.get('/api/list-type-product',apiTypeProduct.apiGetTypeProducts);
     router.delete('/api/delete-type-product/:id', apiTypeProduct.apiDeleteTypeProduct);
     router.post('/api/edit-type-product', apiTypeProduct.apiEditTypeProduct);

    //  router.get('/api/list-type-product',apiTypeProduct.apiListTypeProduct);
    app.use("/", router);
};

export default initApiRoutes;
