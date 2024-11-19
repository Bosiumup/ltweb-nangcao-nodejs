import productService from "../../services/APIServices/apiProductService";

let apigetAllProduct = async (req, res) => {
    let data = await productService.getAllProduct();
    return res.status(200).json({
        data: data,
        errCode: 1,
        errMessage: 'Lấy sản phẩm thành công!'
    })
}

let apigetTypeProduct = async (req, res) => {
    let data = await productService.getTypeProduct();
    return res.status(200).json({
        data: data,
        errCode: 1,
        errMessage: 'Lấy loại thành công!'
    })
}

let apigetProductFromType = async (req, res) => {
    let id = req.params.id;
    let data = await productService.getProductFromType(id);
    return res.status(200).json({
        data: data,
        errCode: 1,
        errMessage: 'Lấy sản phẩm thành công!'
    })
}
export default { apigetAllProduct, apigetTypeProduct, apigetProductFromType }