import Product from '../../models/Product'
import DetailProduct from '../../models/DetailProduct'
import TypeProduct from '../../models/TypeProduct';

let getAllProduct = async () => {
    let rows = await Product.findAll();
    return rows;
}

let getTypeProductt = async () => {
    let rows = await TypeProduct.findAll();
    return rows;
}

let getProductFromType = async (id_type_product) => {
    const product = await Product.findAll({
        include: [{
            model: TypeProduct,
            attributes: ['name'] // Chỉ lấy tên và giá sản phẩm
        }],
        where: { id_type_product: id_type_product }
    });
    return product;
};

let getOneProduct = async (id) => {
    const product = await Product.findOne({
        where: { id }
    });
    console.log("Kết quả truy vấn:", product); // Kiểm tra kết quả truy vấn
    return product;
};

let getSizeStock = async (id_product) => {
    const product = await DetailProduct.findAll({
        where: { id_product },
        attributes: ['size', 'stock']
    })
    return product;
}


export default { getAllProduct, getTypeProductt, getProductFromType, getOneProduct, getSizeStock }