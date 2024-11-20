import TypeProduct from "../models/TypeProduct";

let serviceCreateNewTypeProduct = async (name) => {
    try {
        // Kiểm tra xem thể loại sản phẩm đã tồn tại hay chưa
        let checkNameTypeProduct = await TypeProduct.findOne({
            where: { name: name }, // Tìm thể loại sản phẩm có tên trùng với tên nhập vào
        });

        // Nếu đã tồn tại, ném lỗi và không tạo mới
        if (checkNameTypeProduct) {
            return {
                success: false,
                message: "Tên thể loại sản phẩm đã tồn tại!",
            }; // Trả về thông báo thất bại
        }

        // Nếu chưa tồn tại, tạo mới thể loại sản phẩm
        let newTypeProduct = await TypeProducts.create({
            name: name, // Lưu tên thể loại sản phẩm vào cơ sở dữ liệu
        });

        return {
            success: true,
            message: "Thêm thể loại sản phẩm thành công!",
            typeProduct: newTypeProduct,
        }; // Trả về thông báo thành công và đối tượng mới
    } catch (error) {
        console.error("Error in serviceCreateNewTypeProduct:", error);
        return { success: false, message: "Lỗi khi tạo thể loại sản phẩm." }; // Trả về thông báo lỗi nếu có
    }
};

let serviceGetAllTypeProduct = async () => {
    return await TypeProduct.findAll();
};

export default {
    serviceCreateNewTypeProduct,
    serviceGetAllTypeProduct,
};
