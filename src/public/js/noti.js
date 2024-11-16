// Hiển thị thông báo
document.getElementById("success-message").classList.add("show");

// Sau 3 giây, ẩn thông báo
setTimeout(function () {
    document.getElementById("success-message").classList.remove("show");
    document.getElementById("success-message").classList.add("hide");
}, 3000);

// Sau khi animation ẩn kết thúc, xóa lớp "hide"
setTimeout(function () {
    document.getElementById("success-message").classList.remove("hide");
}, 3500); // 3500ms = 3000ms + 500ms (thời gian animation)
