import Product from "../models/Product";
import Fuse from "fuse.js";

let serviceAllFunctionProduct = async (page, sortOrder, query = "") => {
    let limit = 5; // Số lượng sản phẩm mỗi trang
    let offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại

    try {
        let count, rows;

        // Truy vấn dữ liệu sản phẩm từ cơ sở dữ liệu (không có tìm kiếm)
        if (query) {
            // Tìm kiếm theo từ khóa (sử dụng Fuse.js)
            let { count: totalCount, rows: allProducts } =
                await Product.findAndCountAll({
                    order: [["id", sortOrder]],
                });

            const fuseOptions = {
                keys: ["name", "description"], // Tìm kiếm theo username và fullname
                threshold: 0.3, // Độ chính xác tìm kiếm
            };

            const fuse = new Fuse(
                allProducts.map((product) => product.toJSON()),
                fuseOptions
            ); // Dữ liệu người dùng đã lấy
            const searchResults = fuse
                .search(query)
                .map((result) => result.item); // Kết quả tìm kiếm
            rows = searchResults; // Gán kết quả tìm kiếm vào rows
            count = rows.length; // Tổng số kết quả tìm kiếm
        } else {
            // Nếu không có tìm kiếm, lấy dữ liệu người dùng phân trang từ cơ sở dữ liệu
            let result = await Product.findAndCountAll({
                limit: limit,
                offset: offset,
                order: [["id", sortOrder]], // Sắp xếp theo ID hoặc tên sản phẩm

            rows = result.rows; // Danh sách sản phẩm trong phạm vi phân trang
            count = result.count; // Tổng số sản phẩm
        }

        // Tính tổng số trang
        let totalPages = Math.ceil(count / limit);

        return {
            products: rows, // Danh sách sản phẩm cho trang hiện tại (sau khi phân trang và tìm kiếm)
            currentPage: page, // Trang hiện tại
            totalPages: totalPages, // Tổng số trang
            totalProducts: count, // Tổng số sản phẩm (hoặc kết quả tìm kiếm)
        };
    } catch (err) {
        throw new Error("Lỗi khi lấy dữ liệu sản phẩm: ".err.message);
    }
};

let serviceCreateNewProduct = async (name, description, imageUrl, price) => {
    return await Product.create({
        name: name,
        description: description,
        imageUrl: imageUrl,
        price: price,

    });
};

let serviceUpdateProductById = async (id, name, description, imageUrl, price) => {
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
    serviceGetProductById,
    serviceDeleteProductById,
};
