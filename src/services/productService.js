import Product from "../models/Product";

let serviceGetAllProduct = async () => {
    return await Product.findAll();
};

let serviceCreateNewProduct = async (name, description, imageUrl) => {
    return await Product.create({
        name: name,
        description: "",
        imageUrl: "",
    });
};

let serviceUpdateProductById = async (id, name, description, imageUrl) => {
    if (!id) {
        console.log("ID không hợp lệ.");
    }
    try {
        return await Product.update(
            {
                name: name,
                description: description,
                imageUrl: imageUrl,
            },
            {
                where: { id: id },
            }
        );
    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
    }
};

let serviceGetProductById = async (id) => {
    return await Product.findOne({
        where: { id: id },
    });
};

let serviceDeleteProductById = async (id) => {
    return await Product.destroy({
        where: {
            id: id,
        },
    });
};

export default {
    serviceCreateNewProduct,
    serviceGetAllProduct,
    serviceUpdateProductById,
    serviceGetProductById,
    serviceDeleteProductById,
};
