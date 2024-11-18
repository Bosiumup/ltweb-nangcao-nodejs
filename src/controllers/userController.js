import userService from "../services/userService";
import cloudinary from "../config/cloudinaryConfig";
import fs from "fs";

let controllerAllFunctionUser = async (req, res) => {
    try {
        let message = req.query.message || null;
        let type = req.query.type || null;
        let sort = req.query.sort || "desc";
        let page = parseInt(req.query.page) || 1;
        let search = req.query.search || null;

        let { users, currentPage, totalPages, totalUsers } =
            await userService.serviceAllFunctionUser(page, sort, search);

        // Kiểm tra nếu không có kết quả tìm kiếm
        let noResults = users.length === 0; // Nếu không có người dùng, hiển thị thông báo không tìm thấy

        res.render("PAGE_List_User", {
            data: {
                title: "Danh sách người dùng",
                successMessage: message,
                typeMessage: type,
                users: users, // Danh sách người dùng (có thể là rỗng nếu không có kết quả tìm kiếm)
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
        res.status(500).send("Có lỗi xảy ra khi lấy dữ liệu người dùng.");
    }
};

let controllerGetCreateUser = (req, res) => {
    let message = req.query.message || null;
    let type = req.query.type || null;
    return res.render("PAGE_Create_User", {
        data: {
            title: "Cấp tài khoản",
            successMessage: message,
            typeMessage: type,
        },
        session: req.session.user,
    });
};

let controllerCreateNewUser = async (req, res) => {
    let { username, password } = req.body;
    let created = await userService.serviceCreateNewUser(username, password);
    if (!created) {
        return res.redirect(
            "/PAGE_Create_User?message=Tài khoản đã tồn tại&type=error"
        );
    } else {
        return res.redirect(
            "/PAGE_Create_User?message=Tạo người dùng thành công&type=success"
        );
    }
};

let controllerDeleteUserById = async (req, res) => {
    let { userId } = req.body;
    await userService.serviceDeleteUserById(userId);
    return res.redirect(
        "/PAGE_List_User?message=Xóa người dùng thành công&type=success"
    );
};

let controllerEditUserById = async (req, res) => {
    let { id } = req.params;
    let message = req.query.message || null;
    let type = req.query.type || null;
    let user = await userService.serviceGetUserById(id);
    return res.render("PAGE_Edit_User", {
        data: {
            title: "Chỉnh sửa thông tin",
            user: user,
            successMessage: message,
            typeMessage: type,
        },
        session: req.session.user,
    });
};

let controllerUpdateUserById = async (req, res) => {
    let { id, fullname, address, phone, role } = req.body;
    await userService.serviceUpdateUserById(id, fullname, address, phone, role);
    return res.redirect(
        `/PAGE_Edit_User/${id}?message=Cập nhật thông tin thành công&type=success`
    );
};

let controllerUpdateAvatar = async (req, res) => {
    let { id, currentImageUrl } = req.body;
    let newAvatarUrl = currentImageUrl;
    if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "users",
            });
            newAvatarUrl = result.secure_url; // Lấy URL ảnh đã upload lên Cloudinary
            fs.unlinkSync(req.file.path); // Xóa file ảnh tạm trong server sau khi upload thành công
        } catch (error) {
            console.error("Lỗi khi upload ảnh lên Cloudinary:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi khi upload ảnh lên Cloudinary.",
            });
        }
    }
    await userService.serviceUpdateAvatar(id, newAvatarUrl); // Cập nhật URL ảnh mới
    return res.redirect(
        `/PAGE_Edit_User/${id}?message=Cập nhật ảnh đại diện thành công&type=success`
    );
};

export default {
    controllerAllFunctionUser,
    controllerGetCreateUser,
    controllerCreateNewUser,
    controllerDeleteUserById,
    controllerEditUserById,
    controllerUpdateUserById,
    controllerUpdateAvatar,
};
