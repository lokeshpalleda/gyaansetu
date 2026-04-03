# 📚 GyaanSetu — Mentor‑Student Doubt Solving Platform

GyaanSetu is a full‑stack web application designed to connect students with mentors to solve technical doubts efficiently. The platform allows students to request help from mentors and schedule mentoring sessions where problems can be discussed and resolved.

The system helps create a collaborative learning environment where knowledge sharing becomes easier and structured.

---

# 🚀 Live Deployment

Frontend (Netlify)  
https://gyaan-setu.netlify.app/

Backend (Render)  
https://gyaansetu-backend-5eez.onrender.com

---

# 🎯 Project Features

## 👨‍🎓 Student Features

- Secure authentication using **Clerk**
- Post doubts and request mentor assistance
- View available mentors and their skills
- Send help requests to mentors
- View scheduled mentoring sessions
- Receive **meeting links via email**

---

## 👨‍🏫 Mentor Features

- Register as a mentor
- Add technical skills
- Receive student doubt requests
- Accept or reject requests
- Schedule mentoring sessions within **4 hours**
- Conduct mentoring meetings via generated meeting link

---

## 📅 Session Management

- Smart session scheduling system
- Prevents mentor scheduling conflicts
- Automatic meeting link generation
- Session completion tracking

---

## 📧 Email Notification System

Whenever a mentor schedules a session:

- A meeting link is generated
- Session details are stored in the database
- Email notifications are sent to both **student and mentor**

---

# 🏗️ Tech Stack

## Frontend

- React.js
- Vite
- Axios
- React Router
- Clerk Authentication
- React Hot Toast

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Nodemailer (Email Service)

---

## Deployment

Frontend → **Netlify**  
Backend → **Render**  
Database → **MongoDB Atlas**

---

# 📂 Project Structure
gyaansetu
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── services
│ │ └── App.jsx
│ │
│ ├── public
│ │ └── favicon
│ │
│ ├── index.html
│ └── package.json
│
├── backend
│ ├── controllers
│ ├── models
│ ├── routes
│ ├── services
│ ├── server.js
│ └── package.json
│
└── README.md


---

# ⚙️ Local Installation

## 1️⃣ Clone the repository
git clone https://github.com/lokeshpalleda/gyaansetu.git
cd gyaansetu

---

## 2️⃣ Backend Setup
cd backend
npm install


Create `.env` file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password


Start backend:
npm start


Backend will run on:
http://localhost:5000


---

## 3️⃣ Frontend Setup
cd frontend
npm install


Create `.env` file:
VITE_BACKEND_URL=http://localhost:5000
VITE_CLERK=your_clerk_publishable_key


Run frontend:
npm run dev


Frontend runs on:
http://localhost:5173


---

# 🔌 API Endpoints

## Mentor APIs
GET /api/mentors
GET /api/mentor/:email
POST /api/mentor


---

## Proposal APIs
POST /api/proposal
GET /api/mentor-proposals/:email
GET /api/proposal/accept/:id
GET /api/proposal/reject/:id


---

## Session APIs
POST /api/sessions
GET /api/sessions/student/:email
GET /api/sessions/mentor/:email
PATCH /api/sessions/complete/:id


---

# 📧 Email Notification Flow

1. Mentor accepts a proposal
2. Mentor schedules a session
3. Meeting link is generated
4. Session stored in MongoDB
5. Email notification sent to both users

---

# 🔒 Authentication

Authentication is implemented using **Clerk**.

Features include:

- Secure login system
- Email based authentication
- User session management
- Protected routes

---

# 🌐 Deployment

## Frontend Deployment

Platform: **Netlify**

Build settings:
Build Command: npm run build
Publish Directory: dist


Environment variables:
VITE_BACKEND_URL=https://gyaansetu-backend-5eez.onrender.com
VITE_CLERK=your_clerk_key


---

## Backend Deployment

Platform: **Render**

Environment variables:
PORT=5000
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password


---

# 📈 Future Improvements

- Integrated video calling
- Chat between mentor and student
- Mentor rating system
- AI‑based mentor recommendation
- Payment system for premium sessions
- Session analytics dashboard

---

# 👨‍💻 Authors

Developed by

**PALLEDA LOKESH**
**KANCHANA ADITYA RAMANA SAI NAGENDRA**  

---

# 📄 License

This project is built for **educational and learning purposes**.
