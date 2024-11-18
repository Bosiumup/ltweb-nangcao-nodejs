import bcrypt from "bcryptjs";
import User from "../models/User";
import Fuse from "fuse.js";

let serviceAllFunctionUser = async (page, sortOrder, query = "") => {
    let limit = 5; // Số lượng người dùng mỗi trang
    let offset = (page - 1) * limit; // Vị trí bắt đầu của trang hiện tại

    try {
        let count, rows;

        // Truy vấn dữ liệu người dùng từ cơ sở dữ liệu (không có tìm kiếm)
        if (query) {
            // Tìm kiếm theo từ khóa (sử dụng Fuse.js)
            let { count: totalCount, rows: allUsers } =
                await User.findAndCountAll({
                    where: { role: "user" },
                    order: [["id", sortOrder]],
                });

            const fuseOptions = {
                keys: ["username", "fullname"], // Tìm kiếm theo username và fullname
                threshold: 0.3, // Độ chính xác tìm kiếm
            };

            const fuse = new Fuse(
                allUsers.map((user) => user.toJSON()),
                fuseOptions
            ); // Dữ liệu người dùng đã lấy
            const searchResults = fuse
                .search(query)
                .map((result) => result.item); // Kết quả tìm kiếm
            rows = searchResults; // Gán kết quả tìm kiếm vào rows
            count = rows.length; // Tổng số kết quả tìm kiếm
        } else {
            // Nếu không có tìm kiếm, lấy dữ liệu người dùng phân trang từ cơ sở dữ liệu
            let result = await User.findAndCountAll({
                limit: limit,
                offset: offset,
                where: { role: "user" },
                order: [["id", sortOrder]], // Sắp xếp theo ID hoặc tên người dùng
            });

            rows = result.rows; // Danh sách người dùng trong phạm vi phân trang
            count = result.count; // Tổng số người dùng
        }

        // Tính tổng số trang
        let totalPages = Math.ceil(count / limit);

        return {
            users: rows, // Danh sách người dùng cho trang hiện tại (sau khi phân trang và tìm kiếm)
            currentPage: page, // Trang hiện tại
            totalPages: totalPages, // Tổng số trang
            totalUsers: count, // Tổng số người dùng (hoặc kết quả tìm kiếm)
        };
    } catch (err) {
        throw new Error("Lỗi khi lấy dữ liệu người dùng: ".err.message);
    }
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

export default {
    serviceCreateNewUser,
    serviceDeleteUserById,
    serviceGetUserById,
    serviceUpdateUserById,
    serviceGetUsername,
    serviceUpdateAvatar,
    serviceAllFunctionUser,
};
