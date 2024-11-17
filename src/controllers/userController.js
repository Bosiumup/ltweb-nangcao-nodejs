import userService from "../services/userService";
import cloudinary from "../config/cloudinaryConfig";
import fs from "fs";

let controllerGetAllUser = async (req, res) => {
    let message = req.query.message || null;
    let type = req.query.type || null;
    let sort = req.params.sort || "desc";
    let users = await userService.serviceGetAllUser();
    return res.render("PAGE_List_User", {
        data: {
            title: "Danh sách người dùng",
            users: users,
            successMessage: message,
            typeMessage: type,
            sortOrder: sort,
        },
        session: req.session.user,
    });
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

let controllerOrderUser = async (req, res) => {
    let { sort } = req.params;
    try {
        let users = await userService.serviceOrderUser(sort);
        return res.render("PAGE_List_User", {
            data: {
                title: "Danh sách người dùng",
                users: users,
                sortOrder: sort,
            },
            session: req.session.user,
        });
    } catch (error) {
        return console.error("Lỗi khi sắp xếp người dùng:", error);
    }
};

export default {
    controllerGetAllUser,
    controllerGetCreateUser,
    controllerCreateNewUser,
    controllerDeleteUserById,
    controllerEditUserById,
    controllerUpdateUserById,
    controllerUpdateAvatar,
    controllerOrderUser,
};
