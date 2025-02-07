# 🛍 ShoeShop - Ecommerce Website

## 📌 Giới thiệu

**ShoeShop** là một website thương mại điện tử bán giày, được xây dựng bằng **ReactJS** cho frontend và **Node.js với Express** cho backend. Ứng dụng cho phép người dùng duyệt sản phẩm, thêm vào giỏ hàng, thanh toán, và quản lý đơn hàng.

---

## 🚀 Công nghệ sử dụng

### ✅ Frontend (ReactJS)

- ReactJS + Vite
- Redux Toolkit (quản lý state)
- React Router (điều hướng)
- Axios (gọi API)
- Tailwind CSS / Material-UI (giao diện)

### ✅ Backend (Node.js + Express)

- Express.js
- MongoDB với Mongoose (database)
- JWT (xác thực)
- Bcrypt (mã hóa mật khẩu)
- Cloudinary (lưu trữ hình ảnh)
- Stripe / VNPay (thanh toán online)

---

## 🔥 Cài đặt & Chạy dự án

### 1️⃣ Clone repository

```sh
git clone https://github.com/your-username/shoe-shop.git
cd shoe-shop
```

### 2️⃣ Cài đặt Backend

```sh
cd backend
npm install
```

**Tạo file **``** và cấu hình:**

```env
PORT=5000
MONGO_URI=mongodb+srv://your-db-uri
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
STRIPE_SECRET_KEY=your-stripe-key
```

**Chạy server:**

```sh
npm run dev
```

### 3️⃣ Cài đặt Frontend

```sh
cd ../frontend
npm install
```

**Chạy React App:**

```sh
npm run dev
```

---

## 🛒 Tính năng chính

✅ Đăng ký / Đăng nhập (JWT Authentication)\
✅ Xem danh sách sản phẩm\
✅ Bộ lọc & tìm kiếm sản phẩm\
✅ Thêm vào giỏ hàng & cập nhật số lượng\
✅ Thanh toán online bằng Stripe / VNPay\
✅ Quản lý đơn hàng (User & Admin)\
✅ Trang Admin (Quản lý sản phẩm, đơn hàng, người dùng)

---

## 📸 Screenshots

📍 Trang chủ\
📍 Giỏ hàng\
📍 Thanh toán\
📍 Trang quản trị

---

## 🎯 Cấu trúc thư mục

```bash
shoe-shop/
├── backend/        # Server Node.js với Express
│   ├── models/     # Mongoose models
│   ├── routes/     # Express routes
│   ├── controllers/ # Xử lý logic
│   ├── config/     # Cấu hình database, JWT
│   ├── middleware/ # Middleware xác thực
│   ├── server.js   # Entry point
├── frontend/       # Ứng dụng React
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/  # Redux store
│   │   ├── App.js
│   ├── public/
├── README.md
```

---

## 📌 Liên hệ & Đóng góp

Nếu bạn muốn đóng góp, hãy tạo một **Pull Request** hoặc liên hệ với tôi qua email: 📧 [your-email@example.com](mailto\:your-email@example.com)

⭐ Nếu bạn thích dự án này, hãy **star** repo nhé! 🚀

