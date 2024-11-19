import Product from '../../models/Product'
import DetailProduct from '../../models/DetailProduct'

let getAllProduct = async () => {
    let [rows, fields] = await Product.findAll();
    return rows;
}

let getTypeProduct = async () => {
    let [rows, fields] = await DetailProduct.findAll();
    return rows;

}

let getProductFromType = async (id) => {
    let [rows, fields] = await Product.findAll({
        where: { id },
        include: [
            {
                model: DetailProduct,
                attributes: ['price']
            }
        ]
    });

    return rows;
};


export default { getAllProduct, getTypeProduct, getProductFromType }