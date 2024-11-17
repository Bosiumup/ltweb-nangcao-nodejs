// Kiểm tra xem có thông báo trên trang hay không
document.addEventListener("DOMContentLoaded", function () {
    const messageElement = document.getElementById("message");
    if (messageElement) {
        // Hiển thị thông báo
        messageElement.classList.add("show");

        // Ẩn thông báo sau 3 giây
        setTimeout(function () {
            messageElement.classList.remove("show");
            messageElement.classList.add("hide");
        }, 3000);

        // Sau khi animation ẩn kết thúc, xóa lớp "hide"
        setTimeout(function () {
            messageElement.classList.remove("hide");
        }, 3500);
    }
});
