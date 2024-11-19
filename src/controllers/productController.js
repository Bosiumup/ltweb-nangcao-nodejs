import productService from "../services/productService";
let apiGetGroupProduct = async (req, res) => {
    try {
        let groupProduct = await productModel.modelGetGroupProduct();
        return res.json({
            success: true,
            errCode: 1,
            errMessage: "Lấy nhóm sản phẩm thành công!",
            groupProduct: groupProduct,
        });
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi khi lấy nhóm sản phẩm!",
        });
    }
};

let apiGetAllProduct = async (req, res) => {
    try {
        let products = await productModel.modelGetAllProduct();
        return res.json({
            success: true,
            errCode: 1,
            errMessage: "Lấy danh sách sản phẩm thành công!",
            products: products,
        });
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi khi lấy danh sách sản phẩm!",
        });
    }
};

let apiGetDetailProduct = async (req, res) => {
    let masp = req.query.masp;
    try {
        let product = await productModel.modelGetProductById(masp);
        return res.json({
            success: true,
            errCode: 1,
            errMessage: "Lấy chi tiết sản phẩm thành công!",
            product: product,
        });
    } catch (error) {
        return res.json({
            success: false,
            errCode: 3,
            errMessage: "Lỗi khi lấy chi tiết sản phẩm!",
        });
    }
};

let controllerGetAllProduct = async (req, res) => {
    let message = req.query.message || null;
    let type = req.query.type || null;
    let sort = req.params.sort || "desc";
    let products = await productService.serviceGetAllProduct();
    return res.render("PAGE_List_Product", {
        data: {
            title: "Danh sách sản phẩm",
            products: products,
            successMessage: message,
            typeMessage: type,
            sortOrder: sort,
        },
        session: req.session.user,
    });
};


let controllerGetCreateProduct = (req, res) => {
    let message = req.query.message || null;
    let type = req.query.type || null;
    return res.render("PAGE_Create_Product", {
        data: {
            title: "Thêm sản phẩm",
            successMessage: message,
            typeMessage: type,
        },
        session: req.session.user,
    });
};

let controllerCreateNewProduct = async (req, res) => {
    let { name, description, imageUrl } = req.body;
    let created = await productService.serviceCreateNewProduct(name, description, imageUrl);
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
    let { id } = req.params;
    let message = req.query.message || null;
    let type = req.query.type || null;
    let product = await productService.serviceGetProductById(id);
    return res.render("PAGE_Edit_Product", {
        data: {
            title: "Chỉnh sửa thông tin",
            product: product,
            successMessage: message,
            typeMessage: type,
        },
        session: req.session.user,
    });
};

let controllerUpdateProductById = async (req, res) => {
    let { id, name, description, imageUrl } = req.body;
    await productService.serviceUpdateProductById(id, name, description, imageUrl);
    return res.redirect(
        `/PAGE_Edit_Product/${id}?message=Cập nhật thông tin thành công&type=success`
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
    await productService.serviceUpdateAvatar(id, newAvatarUrl); // Cập nhật URL ảnh mới
    return res.redirect(
        `/PAGE_Edit_Product/${id}?message=Cập nhật ảnh đại diện thành công&type=success`
    );
};

let controllerDeleteProductById = async (req, res) => {
    let { productId } = req.body;
    await productService.serviceDeleteProductById(productId);
    return res.redirect(
        "/PAGE_List_Product?message=Xóa sản phẩm thành công&type=success"
    );
};






export default {apiGetGroupProduct,
                apiGetAllProduct,
                apiGetDetailProduct,
                controllerGetAllProduct,
                controllerCreateNewProduct,
                controllerGetCreateProduct,
                controllerEditProductById,
                controllerUpdateAvatar,
                controllerUpdateProductById,
                controllerDeleteProductById
             };
