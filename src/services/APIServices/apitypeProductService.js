import sequelizeDB from '../../config/sequelizeDB'; // Đảm bảo đây là Sequelize instance đúng

// Hàm tạo mới thể loại sản phẩm
let handleCreateNewTypeProduct = async (data) => {
    try {
        console.log('Dữ liệu nhận được trong service:', data); // In ra dữ liệu nhận từ frontend

        // Kiểm tra nếu tên thể loại trống
        if (!data.name || data.name.trim() === "") {
            return {
                errCode: 1,
                errMessage: 'Tên thể loại không được để trống!',
            };
        }

        // Chuẩn hóa tên thể loại
        const normalizedName = data.name.trim().toLowerCase();

        // Kiểm tra tên thể loại đã tồn tại trong database
        const [rows] = await sequelizeDB.query(
            'SELECT * FROM type_products WHERE BINARY LOWER(name) = ?',
            {
                replacements: [normalizedName],
                type: sequelizeDB.QueryTypes.SELECT,
            }
        );

        // Log kết quả SELECT
        console.log('Kết quả SELECT:', rows);

        // Nếu tên thể loại đã tồn tại
        if (rows) { // Kiểm tra nếu kết quả không rỗng
            return {
                errCode: 2,
                errMessage: 'Tên thể loại sản phẩm đã tồn tại! Không thể thêm mới.',
                
            };
        }
        // Thêm mới thể loại sản phẩm vào database
        try {
            await sequelizeDB.query(
                'INSERT INTO type_products (name, createdAt, updatedAt) VALUES (?, ?, ?)',
                {
                    replacements: [data.name.trim(), new Date(), new Date()],
                    type: sequelizeDB.QueryTypes.INSERT,
                }
            );
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return {
                    errCode: 3,
                    errMessage: 'Tên thể loại sản phẩm đã tồn tại (ràng buộc UNIQUE trong database)!',
                };
            }
            throw error; // Ném lỗi nếu không phải lỗi UNIQUE
        }

        return {
            errCode: 0,
            errMessage: 'Thêm loại sản phẩm mới thành công!',
        };

    } catch (error) {
        console.error('Error in handleCreateNewTypeProduct:', error);
        return {
            errCode: -1,
            errMessage: 'Lỗi hệ thống! Vui lòng thử lại.',
        };
    }
};

let handleGetAllTypeProducts = async () => {
    try {
        const [rows] = await sequelizeDB.query(
            'SELECT * FROM type_products ORDER BY createdAt DESC',
        );

        console.log('Dữ liệu từ cơ sở dữ liệu:', rows);  // Kiểm tra xem có bao nhiêu dữ liệu trả về

        if (rows.length === 0) {
            return {
                errCode: 0,
                errMessage: 'Không có loại sản phẩm nào.',
                data: [],
            };
        }

        return {
            errCode: 0,
            errMessage: 'Lấy danh sách loại sản phẩm thành công!',
            data: rows,  // Trả về mảng tất cả các loại sản phẩm
        };
    } catch (error) {
        console.error('Error in handleGetAllTypeProducts:', error);
        return {
            errCode: -1,
            errMessage: 'Lỗi hệ thống! Không thể lấy danh sách.',
        };
    }
};
let handleDeleteTypeProductById = async (id) => {
    try {
        // Kiểm tra xem loại sản phẩm có tồn tại trong cơ sở dữ liệu không
        const [rows] = await sequelizeDB.query(
            'SELECT * FROM type_products WHERE id = ?',
            {
                replacements: [id],
                type: sequelizeDB.QueryTypes.SELECT,
            }
        );

        // Nếu không tìm thấy loại sản phẩm
        if (!rows || rows.length === 0) {
            return {
                errCode: 1,
                errMessage: 'Loại sản phẩm không tồn tại!',
            };
        }

        // Xóa loại sản phẩm khỏi cơ sở dữ liệu
        await sequelizeDB.query(
            'DELETE FROM type_products WHERE id = ?',
            {
                replacements: [id],
                type: sequelizeDB.QueryTypes.DELETE,
            }
        );

        return {
            errCode: 0,
            errMessage: 'Xóa loại sản phẩm thành công!',
        };
    } catch (error) {
        console.error('Error in handleDeleteTypeProductById:', error);
        return {
            errCode: -1,
            errMessage: 'Lỗi hệ thống! Không thể xóa loại sản phẩm.',
        };
    }
};
let handleEditTypeProduct = async (id, data) => {
    try {
        // Chuẩn hóa tên thể loại
        const normalizedName = data.name.trim().toLowerCase();

        // Kiểm tra tên thể loại đã tồn tại trong database
        const [rows] = await sequelizeDB.query(
            'SELECT * FROM type_products WHERE BINARY LOWER(name) = ? AND id != ?',
            {
                replacements: [normalizedName, id],
                type: sequelizeDB.QueryTypes.SELECT,
            }
        );

        // Nếu tên thể loại đã tồn tại
        if (rows && rows.length > 0) {
            return {
                errCode: 2,
                errMessage: 'Tên thể loại sản phẩm đã tồn tại! Không thể chỉnh sửa.',
            };
        }

        // Cập nhật loại sản phẩm vào database
        await sequelizeDB.query(
            'UPDATE type_products SET name = ?, updatedAt = ? WHERE id = ?',
            {
                replacements: [data.name.trim(), new Date(), id],
                type: sequelizeDB.QueryTypes.UPDATE,
            }
        );

        return {
            errCode: 0,
            errMessage: 'Cập nhật loại sản phẩm thành công!',
        };
    } catch (error) {
        console.error('Error in handleEditTypeProduct:', error);
        return {
            errCode: -1,
            errMessage: 'Lỗi hệ thống! Vui lòng thử lại.',
        };
    }
};

// Hàm lấy loại sản phẩm theo ID
let getTypeProductById = async (id) => {
    try {
        const [rows] = await sequelizeDB.query(
            'SELECT * FROM type_products WHERE id = ?',
            {
                replacements: [id],
                type: sequelizeDB.QueryTypes.SELECT,
            }
        );
        return rows[0]; // Trả về loại sản phẩm đầu tiên nếu tìm thấy
    } catch (error) {
        console.error('Error in getTypeProductById:', error);
        throw error;
    }
};


export default {    
    handleCreateNewTypeProduct,
    handleGetAllTypeProducts,
    handleDeleteTypeProductById,
    handleEditTypeProduct
};
