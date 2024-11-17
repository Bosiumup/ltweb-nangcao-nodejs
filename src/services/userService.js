import bcrypt from "bcryptjs";
import User from "../models/User";

let serviceGetAllUser = async () => {
    return await User.findAll({
        where: { role: "user" },
        order: [["fullname", "DESC"]],
    });
};

let serviceGetUsername = async (username) => {
    return await User.findOne({ where: { username } });
};

let serviceHashPassword = async (password) => {
    let salt = bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(password, salt);
};

let serviceCreateNewUser = async (username, password) => {
    let checkUsername = await serviceGetUsername(username);
    if (checkUsername) {
        return false;
    }
    let hashPassword = await serviceHashPassword(password);
    return await User.create({
        username: username,
        password: hashPassword,
        fullname: "",
        address: "",
        email: "",
        role: "user",
        imageUrl: "",
    });
};

let serviceDeleteUserById = async (id) => {
    return await User.destroy({
        where: {
            id: id,
        },
    });
};

let serviceGetUserById = async (id) => {
    return await User.findOne({
        where: { id: id },
    });
};

let serviceUpdateUserById = async (id, fullname, address, phone, role) => {
    if (!id) {
        console.log("ID không hợp lệ.");
    }
    try {
        return await User.update(
            {
                fullname: fullname,
                address: address,
                phone: phone,
                role: role,
            },
            {
                where: { id: id },
            }
        );
    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
    }
};

let serviceUpdateAvatar = async (id, newAvatarUrl) => {
    if (!id) {
        console.log("ID không hợp lệ.");
    }
    try {
        return await User.update(
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

let serviceOrderUser = async (sortOrder) => {
    return await User.findAll({
        where: { role: "user" },
        order: [["fullname", sortOrder]],
    });
};

export default {
    serviceGetAllUser,
    serviceCreateNewUser,
    serviceDeleteUserById,
    serviceGetUserById,
    serviceUpdateUserById,
    serviceGetUsername,
    serviceUpdateAvatar,
    serviceOrderUser,
};
