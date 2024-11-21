import apitypeProductService from '../../services/APIServices/apitypeProductService';

let apiAddTypeProduct = async (req, res) => {
    try {
        console.log("Dữ liệu nhận được từ frontend:", req.body); // Kiểm tra dữ liệu nhận được từ frontend
        console.log("Tên thể loại:", req.body.name); // In ra giá trị name

        // Kiểm tra nếu tên thể loại rỗng hoặc không hợp lệ
        if (!req.body.name || req.body.name.trim() === "") {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Tên thể loại không được để trống!',
            });
        }

        // Gọi service để xử lý việc tạo mới thể loại sản phẩm
        let response = await apitypeProductService.handleCreateNewTypeProduct(req.body);

        // Trả về kết quả từ service cho client
        return res.status(200).json(response);
    } catch (error) {
        // Xử lý lỗi khi có exception
        console.error('Error in apiAddTypeProduct:', error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Lỗi hệ thống!',
        });
    }
};
// let apiListTypeProduct = async (req, res) => {
//     try {
//         let response = await apitypeProductService.handleGetAllTypeProduct();
//         return res.status(200).json(response);
//     } catch (error) {
//         console.error('Error in apiListTypeProduct:', error);
//         return res.status(500).json({
//             errCode: -1,
//             errMessage: 'Lỗi hệ thống!',
//         });
//     }
// };
let apiGetTypeProducts = async (req, res) => {
    try {
        // Gọi service để lấy danh sách loại sản phẩm
        let response = await apitypeProductService.handleGetAllTypeProducts();
        
        // Kiểm tra dữ liệu trả về từ service
        console.log('Dữ liệu trả về từ service:', response);

        if (response.errCode === 0) {
            return res.status(200).json(response); // Trả tất cả dữ liệu về client
        } else {
            return res.status(404).json({
                errCode: response.errCode,
                errMessage: response.errMessage,
            });
        }
    } catch (error) {
        console.error('Error in apiGetTypeProducts:', error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Lỗi hệ thống!',
        });
    }
};
let apiDeleteTypeProduct = async (req, res) => {
    try {
        const typeProductId = req.params.id;  // Lấy ID loại sản phẩm từ URL

        // Kiểm tra nếu ID không hợp lệ hoặc không tồn tại
        if (!typeProductId) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'ID loại sản phẩm không hợp lệ!',
            });
        }

        // Gọi service xóa loại sản phẩm
        let response = await apitypeProductService.handleDeleteTypeProductById(typeProductId);

        // Trả về kết quả từ service cho client
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error in apiDeleteTypeProduct:', error);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Lỗi hệ thống! Không thể xóa loại sản phẩm.',
        });
    }
};
let apiEditTypeProduct = async (req, res) => {
    try {
        const { id, name } = req.body;

        // Kiểm tra nếu tên thể loại rỗng hoặc không hợp lệ
        if (!name || name.trim() === "") {
            return res.status(400).send('Tên thể loại không được để trống!');
        }

        // Gọi service để cập nhật loại sản phẩm
        let response = await apitypeProductService.handleEditTypeProduct(id, req.body);

        if (response.errCode === 0) {
            // Thành công, chuyển hướng về trang danh sách
            return res.redirect('/PAGE_listTypeProducts');
        } else {
            // Trả về lỗi nếu có
            return res.status(400).send(response.errMessage);
        }
    } catch (error) {
        console.error('Error in apiEditTypeProduct:', error);
        return res.status(500).send('Lỗi hệ thống!');
    }
};





export default {
    apiAddTypeProduct,
    apiGetTypeProducts,
    apiDeleteTypeProduct,
    apiEditTypeProduct
};
