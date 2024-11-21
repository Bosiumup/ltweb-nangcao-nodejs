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
    let data = await productService.getTypeProductt();
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

let apigetDetailProduct = async (req, res) => {
    let id = req.params.id;
    let data = await productService.getOneProduct(id);
    return res.status(200).json({
        data: data,
        errCode: 1,
        errMessage: 'Lấy sản phẩm thành công!'
    })
}

let apigetSizeStock = async (req, res) => {
    let id = req.params.id;
    let data = await productService.getSizeStock(id);
    // Sắp xếp kích cỡ theo thứ tự mong muốn: S, M, L, XL
    const sizeOrder = ['S', 'M', 'L', 'XL'];
    data.sort((a, b) => {
        return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
    });
    return res.status(200).json({
        data: data,
        errCode: 1,
        errMessage: 'Lấy size, số lượng thành công'
    })
}
export default { apigetAllProduct, apigetTypeProduct, apigetProductFromType, apigetDetailProduct, apigetSizeStock }