# 🩸 Community Blood Bank Locator

A complete full-stack web application for locating blood banks, checking real-time blood inventory, and submitting emergency blood requests.

---

## 🚀 Features

### User Features
- Register & Login with JWT authentication
- Search blood banks by city and blood group
- View blood bank details with interactive Leaflet map (OpenStreetMap)
- Check real-time blood group availability (units + status)
- Submit emergency blood requests with urgency levels
- Track personal request history

### Admin Features
- Admin dashboard with key metrics
- Add, edit, and delete blood banks
- Update blood group inventory per blood bank
- View and manage all blood requests
- Update request status (Pending / Accepted / Rejected / Completed)
- Manage registered users

---

## 🛠 Technology Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| Frontend   | React.js, Vite, React Router, Axios         |
| Maps       | Leaflet + React Leaflet + OpenStreetMap     |
| Backend    | Node.js, Express.js, REST API               |
| Database   | MongoDB, Mongoose                            |
| Auth       | JWT (JSON Web Tokens), bcrypt               |

---

## 📁 Project Structure

```
Community-Blood-Bank-Locator/
├── frontend/
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ProtectedRoute, BloodBankCard, MapView, AvailabilityBadge
│   │   ├── pages/              # All page components (Home, Login, Search, Admin, etc.)
│   │   ├── services/           # api.js (Axios API functions)
│   │   ├── context/            # AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── config/                 # db.js (MongoDB connection)
│   ├── controllers/            # authController, bloodBankController, bloodRequestController, userController
│   ├── middleware/             # authMiddleware.js, errorHandler.js
│   ├── models/                 # User.js, BloodBank.js, BloodRequest.js
│   ├── routes/                 # authRoutes, bloodBankRoutes, bloodRequestRoutes, userRoutes
│   ├── seed.js                 # Database seeder script
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/community_blood_bank
JWT_SECRET=super_secret_community_blood_bank_key_2026
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🗄️ MongoDB Setup

### Option A — Local MongoDB (Recommended)
1. Install [MongoDB Community Server](https://www.mongodb.com/try/download/community)
2. Start the MongoDB service:
   - **Windows**: Start the MongoDB service from Services, or run `mongod`
   - **macOS/Linux**: `sudo systemctl start mongod`
3. The app connects to `mongodb://127.0.0.1:27017/community_blood_bank`

### Option B — MongoDB Atlas (Cloud)
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Get your connection string and update `MONGO_URI` in `backend/.env`

> **Note**: If local MongoDB is not running, the app automatically falls back to an **in-memory MongoDB** server (`mongodb-memory-server`) for testing — no setup required!

---

## 🔧 Installation & Running

### Step 1 — Clone or Open the Project

```bash
cd Community-Blood-Bank-Locator
```

### Step 2 — Backend Setup

```bash
cd backend
npm install
```

### Step 3 — Seed the Database

```bash
npm run seed
```

This populates:
- 8 blood banks across major Indian cities
- Admin account
- Sample regular user
- 2 sample blood requests

### Step 4 — Start the Backend

```bash
npm run dev
```

Backend runs at: `http://localhost:5000`

### Step 5 — Frontend Setup (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## 🔐 Admin Login Credentials (Development / Testing Only)

| Role  | Email                   | Password   |
|-------|-------------------------|------------|
| Admin | admin@bloodbank.com     | Admin@123  |
| User  | user@bloodbank.com      | User@123   |

> ⚠️ Change these credentials before any production deployment!

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint              | Access  | Description          |
|--------|-----------------------|---------|----------------------|
| POST   | /api/auth/register    | Public  | Register new user    |
| POST   | /api/auth/login       | Public  | Login & get JWT      |
| GET    | /api/auth/profile     | Private | Get current user     |

### Blood Banks
| Method | Endpoint                   | Access       | Description           |
|--------|----------------------------|--------------|-----------------------|
| GET    | /api/bloodbanks            | Public       | Get all blood banks   |
| GET    | /api/bloodbanks/search     | Public       | Search by city/group  |
| GET    | /api/bloodbanks/:id        | Public       | Get single blood bank |
| POST   | /api/bloodbanks            | Admin only   | Create blood bank     |
| PUT    | /api/bloodbanks/:id        | Admin only   | Update blood bank     |
| DELETE | /api/bloodbanks/:id        | Admin only   | Delete blood bank     |

### Blood Requests
| Method | Endpoint           | Access       | Description              |
|--------|--------------------|--------------|--------------------------|
| POST   | /api/requests      | User/Admin   | Submit blood request     |
| GET    | /api/requests/my   | User/Admin   | Get own requests         |
| GET    | /api/requests      | Admin only   | Get all requests         |
| PUT    | /api/requests/:id  | Admin only   | Update request status    |
| DELETE | /api/requests/:id  | User/Admin   | Delete a request         |

### Users (Admin)
| Method | Endpoint        | Access     | Description      |
|--------|-----------------|------------|------------------|
| GET    | /api/users      | Admin only | Get all users    |
| GET    | /api/users/:id  | Admin only | Get user by ID   |
| DELETE | /api/users/:id  | Admin only | Delete user      |

---

## 🗺️ Pages Overview

| Page                 | Path                      | Access    |
|----------------------|---------------------------|-----------|
| Home                 | /                         | Public    |
| Login                | /login                    | Public    |
| Register             | /register                 | Public    |
| Blood Bank Search    | /search                   | Public    |
| Blood Bank Details   | /bloodbanks/:id           | Public    |
| Blood Request Form   | /request                  | User      |
| My Requests          | /my-requests              | User      |
| User Profile         | /profile                  | User      |
| Admin Dashboard      | /admin/dashboard          | Admin     |
| Manage Blood Banks   | /admin/bloodbanks         | Admin     |
| Add Blood Bank       | /admin/bloodbanks/add     | Admin     |
| Edit Blood Bank      | /admin/bloodbanks/edit/:id| Admin     |
| Manage Requests      | /admin/requests           | Admin     |
| Manage Users         | /admin/users              | Admin     |

---

## 🩸 Blood Availability Status

| Units Available | Status        | Color        |
|-----------------|---------------|--------------|
| 10+             | ✅ Available  | Green        |
| 1–9             | ⚠️ Low        | Orange/Yellow|
| 0               | ❌ Not Available| Red         |

---

## 📸 Screenshots

> *(Add screenshots of your running application here)*
>
> - Home Page
> - Blood Bank Search Results
> - Blood Bank Details with Map
> - Blood Request Form
> - Admin Dashboard
> - Admin Blood Bank Management
> - Admin Request Management

---

## 🔧 Troubleshooting

**Backend won't connect to MongoDB?**
- Check MongoDB service is running locally, or update MONGO_URI in .env
- The app falls back to in-memory server if local MongoDB is unavailable

**Leaflet map shows grey tiles?**
- Ensure you have internet access (OpenStreetMap tiles are fetched online)
- Check Leaflet CSS is loaded in `index.html`

**Frontend shows CORS error?**
- Ensure backend is running at `http://localhost:5000`
- Check `VITE_API_URL` in `frontend/.env`

---

## 📝 License

MIT License — Free to use for educational and personal projects.
