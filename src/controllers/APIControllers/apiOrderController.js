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
export default { apiaddOrder }