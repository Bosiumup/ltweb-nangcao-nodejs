import orderService from '../../services/APIServices/apiOrderService'

let apiaddOrder = async (req, res) => {
    if (req.body !== null) {
        let { address1, phone, status, products, id_user, paymentMethod, paymentStatus, totalPayment } = req.body.address
        let data = await orderService.addOrder(address1, phone, status, products, id_user, paymentMethod, paymentStatus, totalPayment)
        return res.status(200).json({
            data: data,
            errCode: 1,
            message: 'Thêm vào thành công!'
        })
    } else {
        return res.status(200).json({
            message: "Thiếu dữ liệu req.body"
        })
    }

}

let apigetOrder = async (req, res) => {
    const id_user = req.body.id_user
    let data = await orderService.getOrder(id_user)
    return res.status(200).json({
        data: data,
        message: 'Lấy thông tin đơn hàng thành công'
    })
}
export default { apiaddOrder, apigetOrder }