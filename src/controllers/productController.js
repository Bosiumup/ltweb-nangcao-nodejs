import productService from "../services/productService";
import typeProductsServices from "../services/typeProductsServices";
import cloudinary from "../config/cloudinaryConfig";
import fs from "fs";

let controllerAllFunctionProduct = async (req, res) => {
    try {
        let message = req.query.message || null;
        let type = req.query.type || null;
        let sort = req.query.sort || "desc";
        let page = parseInt(req.query.page) || 1;
        let search = req.query.search || null;

        // Gọi dịch vụ để lấy dữ liệu sản phẩm
        let { products, currentPage, totalPages, totalProducts } =
            await productService.serviceAllFunctionProduct(page, sort, search);

        // Kiểm tra nếu products là undefined hoặc rỗng
        if (!products || products.length === 0) {
            products = []; // Nếu không có sản phẩm, gán mảng rỗng
        }

        // Kiểm tra nếu không có kết quả tìm kiếm
        let noResults = products.length === 0; // Nếu không có sản phẩm, hiển thị thông báo không tìm thấy

        res.render("PAGE_List_Product", {
            data: {
                title: "Danh sách sản phẩm",
                successMessage: message,
                typeMessage: type,
                products: products, // Danh sách sản phẩm (có thể là rỗng nếu không có kết quả tìm kiếm)
                currentPage: currentPage, // Trang hiện tại
                totalPages: totalPages, // Tổng số trang
                totalProducts: totalProducts, // Tổng số sản phẩm
                sortOrder: sort, // Tham số sắp xếp
                search: search, // Tham số tìm kiếm
                noResults: noResults, // Cờ xác định có kết quả tìm kiếm không
            },
            session: req.session.user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Có lỗi xảy ra khi lấy dữ liệu sản phẩm.");
    }
};

let controllerGetCreateProduct = async (req, res) => {
    let message = req.query.message || null;
    let type = req.query.type || null;
    let typeProducts = await typeProductsServices.serviceGetAllTypeProduct();
    return res.render("PAGE_Create_Product", {
        data: {
            title: "Thêm sản phẩm",
            successMessage: message,
            typeMessage: type,
            typeProducts: typeProducts,
        },
        session: req.session.user,
    });
};

let controllerCreateNewProduct = async (req, res) => {
    let { name, description, price, id_type_product } = req.body;
    description = description.trim().replace(/\s+/g, " ");
    let created = await productService.serviceCreateNewProduct(
        name,
        description,
        price,
        id_type_product
    );
    if (!created) {
        return res.redirect(
            "/PAGE_Create_Product?message=Sản phẩm đã tồn tại&type=error"
        );
    } else {
        return res.redirect(
            "/PAGE_Create_Product?message=Thêm sản phẩm thành công thành công&type=success"
        );
    }
};

let controllerEditProductById = async (req, res) => {
    let { id, idDetail } = req.query;
    let message = req.query.message || null;
    let type = req.query.type || null;
    let product = await productService.serviceGetProductById(id, idDetail);
    let typeProducts = await typeProductsServices.serviceGetAllTypeProduct();
    return res.render("PAGE_Edit_Product", {
        data: {
            title: "Chỉnh sửa thông tin",
            product: product,
            typeProducts: typeProducts,
            successMessage: message,
            typeMessage: type,
        },
        session: req.session.user,
    });
};

let controllerUpdateProductById = async (req, res) => {
    let { id, id_detail, name, description, price, id_type_product, stock } =
        req.body;
    await productService.serviceUpdateProductById(
        id,
        id_detail,
        name,
        description,
        price,
        id_type_product,
        stock
    );
    return res.redirect(
        `/PAGE_Edit_Product?id=${id}&idDetail=${id_detail}&message=Cập nhật thông tin thành công&type=success`
    );
};

let controllerUpdateAvatar = async (req, res) => {
    let { id, currentImageUrl } = req.body;
    let newAvatarUrl = currentImageUrl;
    if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "product",
            });
            newAvatarUrl = result.secure_url; // Lấy URL ảnh đã upload lên Cloudinary
            fs.unlinkSync(req.file.path); // Xóa file ảnh tạm trong server sau khi upload thành công
        } catch (error) {
            console.error("Lỗi khi upload ảnh lên Cloudinary:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi khi upload ảnh lên Cloudinary.",
            });
        }
    }
    await productService.serviceUpdateImageProduct(id, newAvatarUrl); // Cập nhật URL ảnh mới
    return res.redirect(
        `/PAGE_Edit_Product/${id}?message=Cập nhật hình ảnh thành công&type=success`
    );
};

let controllerDeleteProductById = async (req, res) => {
    let { productId } = req.body;
    await productService.serviceDeleteProductById(productId);
    return res.redirect(
        "/PAGE_List_Product?message=Xóa sản phẩm thành công&type=success"
    );
};

export default {
    controllerAllFunctionProduct,
    controllerCreateNewProduct,
    controllerGetCreateProduct,
    controllerEditProductById,
    controllerUpdateAvatar,
    controllerUpdateProductById,
    controllerDeleteProductById,
};
