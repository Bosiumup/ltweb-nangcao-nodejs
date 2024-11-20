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
            return { message: 'Thêm sản phẩm vào giỏ hàng thành công', cartItem };
        }
    } catch (error) {
        console.error('Lỗi khi thêm vào giỏ hàng:', error);
        throw new Error('Lỗi khi thêm vào giỏ hàng');
    }
};

export default { addCart };