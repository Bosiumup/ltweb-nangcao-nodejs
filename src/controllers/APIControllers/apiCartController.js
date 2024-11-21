import cartService from '../../services/APIServices/apiCartService'

let apiaddCart = async (req, res) => {
    try {
        const { name, price, imageUrl, quantity, size, id_product } = req.body.name
        let data = await cartService.addCart(name, price, imageUrl, quantity, size, id_product)
        return res.status(200).json({
            data: data,
            errCode: 1,
            message: "Thêm sản phẩm vào giỏ hàng thành công!"
        })
    } catch (error) {
        return res.status(200).json({
            errCode: 0,
            message: "Thêm sản phẩm vào giỏ hàng thất bại", error
        })
    }
}
let apiremoveCart = async (req, res) => {
    try {
        const { id_product, size } = req.body.id_product;
        let data = await cartService.removeCart(id_product, size)
        return res.status(200).json({
            errCode: 1,
            message: 'Xóa thành công!',
        })
    } catch (error) {
        return res.status(200).json({
            errCode: 0,
            message: error
        })
    }
}
let apigetCart = async (req, res) => {
    let data = await cartService.getCart();
    return res.status(200).json({
        data: data,
        errCode: 1,
        message: "Lấy giỏ hàng thành công!"
    })
}

let apiupdateCart = async (req, res) => {
    const { id_product, size, quantity } = req.body.id_product
    let data = await cartService.updateQuantity(id_product, size, quantity)
    return res.status(200).json({
        data: data,
        errCode: 1,
        message: 'Cập nhật thành công!'
    })
}
export default { apiaddCart, apigetCart, apiremoveCart, apiupdateCart }