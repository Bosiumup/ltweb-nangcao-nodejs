import userService from "../services/userService";
import cloudinary from "../config/cloudinaryConfig";
import fs from "fs";

let controllerGetAllUser = async (req, res) => {
    let users = await userService.modelGetAllUser();
    let message = req.query.message || null;
    return res.render("PAGE_List_User", {
        data: {
            title: "Danh sách người dùng",
            users: users,
            successMessage: message,
        },
        session: req.session.user,
    });
};

let createUserGet = (req, res) => {
    res.render("PAGE_Create_User", {
        title: "Cấp tài khoản",
        errorMessage: null,
        session: req.session.user,
    });
};

let controllerCreateNewUser = async (req, res) => {
    let { username, password } = req.body;
    let created = await userService.modelCreateNewUser(username, password);
    if (!created) {
        return res.render("createUser", {
            title: "Tạo tài khoản người dùng",
            errorMessage: "Tài khoản đã có sẵn.",
            session: req.session.user,
        });
    } else {
        if (req.session.user && req.session.user.role === "admin") {
            return res.redirect(
                "/list-user?message=Tạo người dùng thành công."
            );
        } else {
            return res.redirect("/login?message=Đăng ký tài khoản thành công.");
        }
    }
};

let controllerDeleteUserById = async (req, res) => {
    let { userId } = req.body;
    await userService.modelDeleteUserById(userId);
    if (req.session.user && req.session.user.role === "admin") {
        return res.redirect("/list-user?message=Xóa người dùng thành công.");
    }
    if (req.session.user && req.session.user.role === "user") {
        req.session.destroy();
        return res.redirect("/login?message=Xóa người dùng thành công.");
    }
};

let controllerEditUserById = async (req, res) => {
    let { id } = req.params;
    let message = req.query.message || null;
    let user = await userService.modelGetUserById(id);
    return res.render("PAGE_Edit_User", {
        data: {
            title: "Chỉnh sửa thông tin",
            user: user,
            successMessage: message,
        },
        session: req.session.user,
    });
};

let controllerUpdateUserById = async (req, res) => {
    let { id, fullname, address, phone, role } = req.body;
    await userService.modelUpdateUserById(id, fullname, address, phone, role);
    return res.redirect(
        `/PAGE_Edit_User/${id}?message=Cập nhật thông tin thành công.`
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
    await userService.modelUpdateAvatar(id, newAvatarUrl); // Cập nhật URL ảnh mới
    return res.redirect(
        `/PAGE_Edit_User/${id}?message=Cập nhật ảnh đại diện thành công.`
    );
};

export default {
    controllerGetAllUser,
    createUserGet,
    controllerCreateNewUser,
    controllerDeleteUserById,
    controllerEditUserById,
    controllerUpdateUserById,
    controllerUpdateAvatar,
};
