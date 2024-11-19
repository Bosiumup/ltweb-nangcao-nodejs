import Product from '../../models/Product'
import DetailProduct from '../../models/DetailProduct'
import getTypeProduct from '../../models/TypeProduct'
import TypeProduct from '../../models/TypeProduct';

let getAllProduct = async () => {
    let [rows, fields] = await Product.findAll();
    return rows;
}

let getTypeProductt = async () => {
    let [rows, fields] = await DetailProduct.findAll();
    return rows;

}

// let getProductFromType = async (id) => {
//     const product = await Product.findAll({ id });
//     return product;
// };

let getProductFromType = async (id_type_product) => {
    const product = await Product.findOne({
        include: [{
            model: TypeProduct,
            attributes: ['name'] // Chỉ lấy tên và giá sản phẩm
        }],
        where: { id_type_product: id_type_product }
    });
    return product;
};


export default { getAllProduct, getTypeProductt, getProductFromType }