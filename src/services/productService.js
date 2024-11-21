import Product from "../models/Product";
import DetailProduct from "../models/DetailProduct";
import TypeProduct from "../models/TypeProduct";
import sequelize from "../config/sequelizeDB";
import Fuse from "fuse.js";

let serviceAllFunctionProduct = async (page, sortOrder, query = "") => {
    let limit = 12; // Số lượng sản phẩm mỗi trang
    let offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại

    try {
        let count, rows;

        // Tìm kiếm theo từ khóa
        if (query) {
            let { count: totalCount, rows: allProducts } =
                await Product.findAndCountAll({
                    order: [["id", sortOrder]],
                    include: [
                        {
                            model: DetailProduct,
                            attributes: ["id", "size", "stock"],
                        },
                        {
                            model: TypeProduct,
                            attributes: ["id", "name"],
                        },
                    ],
                });

            // Kiểm tra nếu có sản phẩm nào
            if (allProducts.length === 0) {
                rows = [];
                count = 0;
            } else {
                const fuseOptions = {
                    keys: ["name", "description"], // Tìm kiếm theo name và description
                    threshold: 0.3, // Độ chính xác tìm kiếm
                };

                const fuse = new Fuse(
                    allProducts.map((product) => product.toJSON()),
                    fuseOptions
                );
                const searchResults = fuse
                    .search(query)
                    .map((result) => result.item);
                rows = searchResults; // Gán kết quả tìm kiếm vào rows
                count = searchResults.length; // Tổng số kết quả tìm kiếm
            }
        } else {
            // Nếu không có tìm kiếm, lấy dữ liệu sản phẩm phân trang
            let result = await Product.findAndCountAll({
                limit: limit,
                offset: offset,
                order: [["id", sortOrder]], // Sắp xếp theo ID
                include: [
                    {
                        model: DetailProduct,
                        attributes: ["id", "size", "stock"],
                    },
                    {
                        model: TypeProduct,
                        attributes: ["id", "name"],
                    },
                ],
            });

            rows = result.rows || []; // Danh sách sản phẩm
            count = result.count || 0; // Tổng số sản phẩm
        }

        // Tính tổng số trang
        let totalPages = Math.ceil(count / limit);

        return {
            products: rows, // Danh sách sản phẩm cho trang hiện tại
            currentPage: page, // Trang hiện tại
            totalPages: totalPages, // Tổng số trang
            totalProducts: count, // Tổng số sản phẩm
        };
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm: ", err);
        throw new Error("Lỗi khi lấy dữ liệu sản phẩm: " + err.message);
    }
};

let serviceCreateNewProduct = async (
    name,
    description,
    price,
    id_type_product
) => {
    // Bắt đầu giao dịch
    const transaction = await sequelize.transaction();

    try {
        // Thêm dữ liệu vào bảng Product
        await Product.create(
            {
                name: name,
                description: description,
                price: price,
                id_type_product: id_type_product,
            },
            { transaction }
        );

        // Thêm dữ liệu vào bảng DetailProduct
        await DetailProduct.create(
            {
                id_product: newProduct.id,
                size: "S",
                stock: "50",
            },
            { transaction }
        );
        await DetailProduct.create(
            {
                id_product: newProduct.id,
                size: "M",
                stock: "50",
            },
            { transaction }
        );
        await DetailProduct.create(
            {
                id_product: newProduct.id,
                size: "L",
                stock: "50",
            },
            { transaction }
        );
        await DetailProduct.create(
            {
                id_product: newProduct.id,
                size: "XL",
                stock: "50",
            },
            { transaction }
        );

        // Cam kết giao dịch (commit)
        await transaction.commit();
    } catch (error) {
        // Nếu có lỗi, rollback giao dịch
        await transaction.rollback();
        throw error;
    }
};

let serviceUpdateProductById = async (
    id,
    id_detail,
    name,
    description,
    price,
    id_type_product,
    stock
) => {
    if (!id) {
        console.log("ID không hợp lệ.");
    }

    // Bắt đầu giao dịch
    const transaction = await sequelize.transaction();

    try {
        const updateProduct = await Product.update(
            {
                name: name,
                description: description,
                price: price,
                id_type_product: id_type_product,
            },
            {
                where: { id: id },
                transaction,
            }
        );

        const updateDetailProduct = await DetailProduct.update(
            {
                stock: stock,
            },
            {
                where: { id: id_detail, id_product: id },
                transaction,
            }
        );

        // Cam kết giao dịch (commit)
        await transaction.commit();

        // Trả về thông tin sản phẩm và chi tiết sản phẩm vừa được tạo
        return { updateProduct, updateDetailProduct };
    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
    }
};

let serviceUpdateImageProduct = async (id, newAvatarUrl) => {
    if (!id) {
        console.log("ID không hợp lệ.");
    }
    try {
        return await Product.update(
            {
                imageUrl: newAvatarUrl,
            },
            {
                where: { id: id },
            }
        );
    } catch (error) {
        console.error("Lỗi khi cập nhật avatar người dùng:", error);
    }
};

let serviceGetProductById = async (id, idDetail) => {
    return await Product.findOne({
        where: { id: id },
        include: [
            {
                model: DetailProduct,
                attributes: ["id", "size", "stock"],
                where: { id: idDetail },
            },
            {
                model: TypeProduct,
                attributes: ["id", "name"],
            },
        ],
    });
};

let serviceDeleteProductById = async (id) => {
    return await DetailProduct.destroy({
        where: {
            id: id,
        },
    });
};

export default {
    serviceCreateNewProduct,
    serviceAllFunctionProduct,
    serviceUpdateProductById,
    serviceUpdateImageProduct,
    serviceGetProductById,
    serviceDeleteProductById,
};
