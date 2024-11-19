import Order from '../models/Order'
import DetailOrder from '../models/DetailOrder'
import Product from '../models/Product'
import Fuse from "fuse.js"

let ServiceAllOrders = async (page, sortOrder, query = "") => {
    let limit = 5; // Số lượng người dùng mỗi trang
    let offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại

    try {
        let count, rows;

        // Truy vấn dữ liệu người dùng từ cơ sở dữ liệu (không có tìm kiếm)
        if (query) {
            // Tìm kiếm theo từ khóa (sử dụng Fuse.js)
            let { count: totalCount, rows: allOrders } =
                await Order.findAndCountAll({
                    // where: { role: "user" },
                    order: [["id", sortOrder]],
                });

            const fuseOptions = {
                keys: ["phone"], // Tìm kiếm theo username và fullname
                threshold: 0.3, // Độ chính xác tìm kiếm
            };

            const fuse = new Fuse(
                allOrders.map((order) => order.toJSON()),
                fuseOptions
            ); // Dữ liệu người dùng đã lấy
            const searchResults = fuse
                .search(query)
                .map((result) => result.item); // Kết quả tìm kiếm
            rows = searchResults; // Gán kết quả tìm kiếm vào rows
            count = rows.length; // Tổng số kết quả tìm kiếm
        } else {
            // Nếu không có tìm kiếm, lấy dữ liệu người dùng phân trang từ cơ sở dữ liệu
            let result = await Order.findAndCountAll({
                limit: limit,
                offset: offset,
                // where: { role: "user" },
                order: [["id", sortOrder]], // Sắp xếp theo ID hoặc tên người dùng
            });

            rows = result.rows; // Danh sách người dùng trong phạm vi phân trang
            count = result.count; // Tổng số người dùng
        }

        // Tính tổng số trang
        let totalPages = Math.ceil(count / limit);

        return {
            orders: rows, // Danh sách người dùng cho trang hiện tại (sau khi phân trang và tìm kiếm)
            currentPage: page, // Trang hiện tại
            totalPages: totalPages, // Tổng số trang
            totalUsers: count, // Tổng số người dùng (hoặc kết quả tìm kiếm)
        };
    } catch (err) {
        throw new Error("Lỗi khi lấy dữ liệu đơn hàng ".err.message);
    }
};

let ServiceOneOrder = async (id) => {
    return await Order.findOne({ where: { id } })
}

let ServiceDetailOrders = async (id_order) => {
    return await DetailOrder.findOne({ where: { id_order } });
}

let ServiceProductOrders = async (id) => {
    return await Product.findOne({
        where: { id }
    });
}

let ServiceUpdateStatus = async (status, id) => {
    return await Order.update(
        {
            status: status
        },
        {
            where: { id }
        }
    )
}


export default { ServiceAllOrders, ServiceDetailOrders, ServiceProductOrders, ServiceUpdateStatus, ServiceOneOrder }