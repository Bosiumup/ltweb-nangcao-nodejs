import Order from '../../models/Order';
import DetailOrder from '../../models/DetailOrder';
import PaymentOrder from '../../models/PaymentOrder'
import Cart from '../../models/Cart'

let addOrder = async (address1, phone, status, products, id_user, paymentMethod, paymentStatus, totalPayment) => {
    try {
        const address = address1;
        let data = await Order.create({
            address,
            phone,
            status,
            id_user,
        });
        const orderId = data.id; // Hoặc bất kỳ thuộc tính nào chứa order_id

        await addDetailPayment(paymentMethod, paymentStatus, totalPayment, orderId);

        for (const product of products) {
            await addDetailOrder(
                product.quantity,
                product.price,
                product.size,
                product.id_product,
                orderId
            );
        }

        await delAllCart();

        return data;
    } catch (error) {
        console.log('Lỗi khi thêm vào đơn hàng', error);
        throw error;
    }
};
let addDetailOrder = async (quantity, price, size, id_product, id_order) => {
    try {
        let data = await DetailOrder.create({
            quantity,
            size,
            price,
            id_product,
            id_order
        })
    } catch (error) {
        console.log('Lỗi khi thêm vào chi tiết đơn', error)
    }
}

let addDetailPayment = async (paymentMethod, paymentStatus, totalPayment, id_order) => {
    try {
        let data = await PaymentOrder.create({
            paymentMethod, paymentStatus, totalPayment, id_order
        })
    } catch (error) {
        console.log('Lỗi khi thêm vào chi tiết thanh toán', error)
    }
}

let delAllCart = async () => {
    let data = await Cart.destroy({ where: {} })
}

export default { addOrder, addDetailOrder, addDetailPayment, delAllCart }