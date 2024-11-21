import { where } from 'sequelize';
import Cart from '../../models/Cart';

const addCart = async (name, price, imageUrl, quantity, size, id_product) => {
    try {
        // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa (cùng size)
        const existingCartItem = await Cart.findOne({
            where: { id_product, size } // Cần kiểm tra cả size
        });

        if (existingCartItem) {
            // Nếu sản phẩm đã có, cập nhật số lượng
            await existingCartItem.update({
                quantity: parseInt(existingCartItem.quantity) + parseInt(quantity) // Ép kiểu sang số
            });
            return { message: 'Cập nhật số lượng sản phẩm trong giỏ hàng thành công' };
        } else {
            // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
            const cartItem = await Cart.create({
                name,
                price,
                imageUrl,
                quantity,
                size,
                id_product
            });
        }
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        throw new Error('Lỗi khi thêm vào giỏ hàng');
    }
};


const removeCart = async (id_product, size) => {
    try {
        let data = await Cart.destroy({ where: { id_product, size } })
        return data;
    } catch (error) {
        console.log("Xóa không thành công", error)
    }
}

const getCart = async () => {
    try {
        let data = await Cart.findAll()
        return data;
    } catch (error) {
        console.log('Lỗi không lấy được giỏ hàng', error)
    }
}


const updateQuantity = async (id_product, size, quantity) => {
    try {
        const updatedCount = await Cart.update(
            { quantity },
            {
                where: { id_product, size }
            }
        );
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error);
    }
};
export default { addCart, removeCart, getCart, updateQuantity };