// Controller xử lý yêu cầu GET để render trang thêm thể loại sản phẩm
// Controller hiển thị trang thêm thể loại sản phẩm
// import typePrductsServices from "../services/typePrductsServices";
import apitypeProductService from "../services/APIServices/apitypeProductService";
let controllerGetCreateTypeProduct = (req, res) => {
    let message = req.query.message || null;
    let type = req.query.type || null;
    return res.render("PAGE_addtypeproducts", {
        data: {
            title: "Thêm thể loại sản phẩm",
            successMessage: message,
            typeMessage: type,
        },
        session: req.session.user,
    });
};

let controllerGetTypeProducts = async (req, res) => {
    try {
        let response = await apitypeProductService.handleGetAllTypeProducts();
        
        // Kiểm tra dữ liệu trả về từ service
        console.log('Dữ liệu trả về từ service:', response);

        // Nếu response.data là đối tượng, chuyển nó thành mảng có một phần tử
        let typeProducts = Array.isArray(response.data) ? response.data : (response.data ? [response.data] : []);
        
        console.log('Dữ liệu typeProducts gửi tới view:', typeProducts);

        // Render page với dữ liệu trả về
        return res.render("PAGE_listTypeproducts", {
            data: {
                title: "Danh sách loại sản phẩm",
                typeProducts: typeProducts, // Truyền mảng vào view
                errorMessage: response.errMessage || null,
            },
            session: req.session.user,
        });
    } catch (error) {
        console.error('Error in controllerGetTypeProducts:', error);
        return res.render("PAGE_listTypeproducts", {
            data: {
                title: "Danh sách loại sản phẩm",
                typeProducts: [], // Nếu không có dữ liệu, trả về mảng rỗng
                errorMessage: "Lỗi hệ thống! Không thể tải danh sách.",
            },
            session: req.session.user,
        });
    }
};
let controllerDeleteTypeProduct = async (req, res) => {
    try {
        const typeProductId = req.params.id; // Lấy ID từ URL

        // Gọi service xóa loại sản phẩm
        const response = await apitypeProductService.handleDeleteTypeProductById(typeProductId);

        // Kiểm tra kết quả trả về từ service
        if (response.errCode === 0) {
            // Nếu thành công, chuyển hướng về trang danh sách loại sản phẩm
            return res.redirect('/PAGE_listtypeproducts');
        } else {
            // Nếu có lỗi, hiển thị thông báo lỗi
            return res.redirect('/PAGE_listtypeproducts?message=' + response.errMessage);
        }
    } catch (error) {
        console.error('Error in controllerDeleteTypeProduct:', error);
        return res.redirect('/PAGE_listtypeproducts?message=Lỗi hệ thống! Không thể xóa loại sản phẩm.');
    }
};
let controllerGetEditTypeProduct = async (req, res) => {
    try {
        let id = req.params.id; // Lấy ID từ URL
        let message = req.query.message || null;
        let type = req.query.type || null;

        // Lấy dữ liệu loại sản phẩm từ database
        let typeProduct = await apitypeProductService.getTypeProductById(id);
        
        if (!typeProduct) {
            return res.redirect('/type-products?message=Loại sản phẩm không tồn tại!');
        }

        return res.render("PAGE_edittypeproducts", {
            data: {
                title: "Chỉnh sửa loại sản phẩm",
                successMessage: message,
                typeMessage: type,
                typeProduct: typeProduct, // Truyền dữ liệu sản phẩm để hiển thị trong form
            },
            session: req.session.user,
        });
    } catch (error) {
        console.error('Error in controllerGetEditTypeProduct:', error);
        return res.redirect('/type-products?message=Lỗi hệ thống!');
    }
};





// Export hàm để sử dụng trong router
export default { 
    controllerGetCreateTypeProduct,
    controllerGetTypeProducts,
    controllerDeleteTypeProduct,
    controllerGetEditTypeProduct

 };
