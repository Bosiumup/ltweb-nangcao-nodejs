import productModel from "../services/productService";
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
export default { apiGetGroupProduct, apiGetAllProduct, apiGetDetailProduct };
