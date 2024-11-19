import orderService from '../services/orderService'

let controllerAllOrder = async (req, res) => {
    try {
        let message = req.query.message || null;
        let type = req.query.type || null;
        let sort = req.query.sort || "desc";
        let page = parseInt(req.query.page) || 1;
        let search = req.query.search || null;

        let { orders, currentPage, totalPages, totalUsers } =
            await orderService.ServiceAllOrders(page, sort, search);

        // Kiểm tra nếu không có kết quả tìm kiếm
        let noResults = orders.length === 0; // Nếu không có người dùng, hiển thị thông báo không tìm thấy

        res.render("PAGE_List_Order", {
            data: {
                title: "Danh sách đơn hàng",
                successMessage: message,
                typeMessage: type,
                orders: orders, // Danh sách người dùng (có thể là rỗng nếu không có kết quả tìm kiếm)
                currentPage: currentPage, // Trang hiện tại
                totalPages: totalPages, // Tổng số trang
                totalUsers: totalUsers, // Tổng số người dùng
                sortOrder: sort, // Tham số sắp xếp
                search: search, // Tham số tìm kiếm
                noResults: noResults, // Cờ xác định có kết quả tìm kiếm không
            },
            session: req.session.user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Có lỗi xảy ra khi lấy dữ liệu đơn hàng.");
    }
};

let controllerDetailOrder = async (req, res) => {
    let id = req.params.id;
    let data = await orderService.ServiceDetailOrders(id);
    // let product = await orderService.ServiceProductOrders(data.id_product);

    res.render("PAGE_Detail_Order", {
        title: "Trang chi tiết đơn hàng",
        data: data,
        // product: product,
        session: req.session.user
    });
};

let controllerEditOrder = async (req, res) => {
    let id = req.params.id;
    let data = await orderService.ServiceOneOrder(id);

    res.render("PAGE_Edit_Order", {
        title: "Trang cập nhật trạng thái đơn hàng",
        data: data,
        session: req.session.user
    });
}

let controllerUpdateOrder = async (req, res) => {
    let { id, status } = req.body
    const result = await orderService.ServiceUpdateStatus(status, id);
    if (result[0] > 0) {
        return res.redirect(
            `/PAGE_Edit_Order/${id}?message=Cập nhật trạng thái thành công&type=success`
        );
    } else {
        return res.redirect(
            `/PAGE_Edit_Order/${id}?message=Cập nhật trạng thái thất bại&type=error`
        );
    }
}
export default { controllerAllOrder, controllerDetailOrder, controllerEditOrder, controllerUpdateOrder }