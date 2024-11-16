let modelGetGroupProduct = async () => {
    let [rows, fields] = await pool.query("SELECT * FROM nhom");
    return rows;
};
let modelGetAllProduct = async () => {
    let [rows, fields] = await pool.query("SELECT * FROM sanpham");
    return rows;
};

let modelGetProductById = async (masp) => {
    let [rows, fields] = await pool.query(
        "SELECT * FROM sanpham WHERE masp = ?",
        [masp]
    );
    return rows[0];
};

export default {
    modelGetGroupProduct,
    modelGetAllProduct,
    modelGetProductById,
};
