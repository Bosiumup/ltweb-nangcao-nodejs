import multer from "multer";
import path from "path";

// Cấu hình Multer để lưu trữ file ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads")); // Đảm bảo thư mục này tồn tại
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file với thời gian để tránh trùng lặp
    },
});

// Cấu hình giới hạn kích thước file tối đa là 5MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn file size
});

export default upload;
