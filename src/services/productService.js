import Product from "../models/Product";
import DetailProduct from "../models/DetailProduct";
import TypeProduct from "../models/TypeProduct";
import sequelize from "../config/sequelizeDB";
import Fuse from "fuse.js";

let serviceAllFunctionProduct = async (page, sortOrder, query = "") => {
    let limit = 5; // Số lượng sản phẩm mỗi trang
    let offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại

    try {
        let count, rows;

<<<<<<< HEAD
        // Truy vấn dữ liệu sản phẩm từ cơ sở dữ liệu (không có tìm kiếm)
=======
        // Tìm kiếm theo từ khóa
>>>>>>> lnmt3
        if (query) {
            let { count: totalCount, rows: allProducts } =
                await Product.findAndCountAll({
                    order: [["id", sortOrder]],
                    include: [
                        {
                            model: DetailProduct,
                            attributes: ["size", "stock"],
                        },
                        {
                            model: TypeProduct,
                            attributes: ["name"],
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
<<<<<<< HEAD
                order: [["id", sortOrder]], // Sắp xếp theo ID hoặc tên sản phẩm
=======
                order: [["id", sortOrder]], // Sắp xếp theo ID
                include: [
                    {
                        model: DetailProduct,
                        attributes: ["size", "stock"],
                    },
                    {
                        model: TypeProduct,
                        attributes: ["name"],
                    },
                ],
            });
>>>>>>> lnmt3

            rows = result.rows || []; // Danh sách sản phẩm
            count = result.count || 0; // Tổng số sản phẩm
        }

        // Tính tổng số trang
        let totalPages = Math.ceil(count / limit);

        return {
<<<<<<< HEAD
            products: rows, // Danh sách sản phẩm cho trang hiện tại (sau khi phân trang và tìm kiếm)
            currentPage: page, // Trang hiện tại
            totalPages: totalPages, // Tổng số trang
            totalProducts: count, // Tổng số sản phẩm (hoặc kết quả tìm kiếm)
=======
            products: rows, // Danh sách sản phẩm cho trang hiện tại
            currentPage: page, // Trang hiện tại
            totalPages: totalPages, // Tổng số trang
            totalProducts: count, // Tổng số sản phẩm
>>>>>>> lnmt3
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
    id_type_product,
    size,
    stock
) => {
    // Bắt đầu giao dịch
    const transaction = await sequelize.transaction();

    try {
        // Thêm dữ liệu vào bảng Product
        const newProduct = await Product.create(
            {
                name: name,
                description: description,
                price: price,
                id_type_product: id_type_product,
            },
            { transaction }
        );

        // Thêm dữ liệu vào bảng DetailProduct
        const newDetailProduct = await DetailProduct.create(
            {
                id_product: newProduct.id,
                size: size,
                stock: stock,
            },
            { transaction }
        );

        // Cam kết giao dịch (commit)
        await transaction.commit();

        // Trả về thông tin sản phẩm và chi tiết sản phẩm vừa được tạo
        return { newProduct, newDetailProduct };
    } catch (error) {
        // Nếu có lỗi, rollback giao dịch
        await transaction.rollback();
        throw error;
    }
};

let serviceUpdateProductById = async (
    id,
    name,
    description,
    imageUrl,
    price
) => {
    if (!id) {
        console.log("ID không hợp lệ.");
    }
    try {
        return await Product.update(
            {
                name: name,
                description: description,
                imageUrl: imageUrl,
                price: price,
            },
            {
                where: { id: id },
            }
        );
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
    serviceAllFunctionProduct,
    serviceUpdateProductById,
    serviceUpdateImageProduct,
    serviceGetProductById,
    serviceDeleteProductById,
};
