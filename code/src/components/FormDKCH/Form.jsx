import React, { useState } from "react";

const RegisterStoreForm = () => {
    const [formData, setFormData] = useState({
        storeName: "",
        address: "",
        email: "",
        phone: "",
        description: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Xử lý gửi dữ liệu đến backend
        const formDataToSend = new FormData();
        formDataToSend.append("storeName", formData.storeName);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("description", formData.description);
        if (formData.file) {
            formDataToSend.append("file", formData.file);
        }

        fetch("/api/register-store", {
            method: "POST",
            body: formDataToSend,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("Đăng ký thành công! Vui lòng chờ admin duyệt.");
                } else {
                    alert("Đăng ký thất bại. Vui lòng thử lại.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Có lỗi xảy ra!");
            });
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
            <h2>Đăng ký cửa hàng</h2>
            <div>
                <label htmlFor="storeName">Tên cửa hàng:</label>
                <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="address">Địa chỉ:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email liên hệ:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="description">Mô tả:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <div>
                <label htmlFor="file">Tài liệu đính kèm:</label>
                <input type="file" id="file" onChange={handleFileChange} />
            </div>
            <button type="submit">Gửi đăng ký</button>
        </form>
    );
};

export default RegisterStoreForm;
