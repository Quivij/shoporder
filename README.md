
# ShopOrder

Ứng dụng **ShopOrder** là một hệ thống quản lý bán hàng (E-commerce) được xây dựng bằng **MERN Stack** (MongoDB, Express, React, Node.js).  
Chức năng chính bao gồm: quản lý sản phẩm, giỏ hàng, đơn hàng, thanh toán và người dùng.

---

## 📂 Cấu trúc thư mục
mern-lab02/
├── client/ # ReactJS frontend
├── server/ # Node.js backend
├── .gitignore
├── README.md
└── README-full.md

---

## ⚙️ Yêu cầu môi trường

- Node.js >= 18  
- MongoDB (local hoặc Atlas)

---

## 🚀 Cách chạy dự án

### 1. Clone repo
```bash
git clone https://github.com/Quivij/mern-lab02.git
cd mern-lab02
2. Cài đặt dependencies
Backend (server)
cd server
npm install

Frontend (client)
cd ../client
npm install

3. Tạo file .env
server/.env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mern-lab02
JWT_SECRET=your_jwt_secret

client/.env
VITE_API_URL=http://localhost:5000/api

4. Chạy ứng dụng
Backend
cd server
npm start

Frontend
cd client
npm run dev


Website chạy tại: http://localhost:5173

API chạy tại: http://localhost:5000


