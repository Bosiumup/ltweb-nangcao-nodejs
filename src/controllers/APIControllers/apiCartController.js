import cartService from '../../services/APIServices/apiCartService'

let apiaddCart = async (req, res) => {
    try {
        const { name, price, imageUrl, quantity, size, id_product } = req.body.name
        console.log(req.body)
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
export default { apiaddCart }