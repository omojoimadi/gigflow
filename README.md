# GigFlow – Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack and TypeScript.

## Tech Stack

**Frontend**
- React.js + TypeScript
- TailwindCSS
- Axios
- React Hot Toast

**Backend**
- Node.js + Express.js + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## Features

- JWT-based Authentication (Register, Login, Protected Routes)
- Role-Based Access Control (Admin, Sales User)
- Leads CRUD (Create, Read, Update, Delete)
- Advanced Filtering by Status and Source
- Debounced Search by Name or Email
- Sort by Latest or Oldest
- Backend Pagination (10 records per page)
- CSV Export
- Responsive UI with Loading, Empty and Error States
- Docker Setup

## Project Structure

gigflow/
├── server/          # Node.js + Express backend
│   └── src/
│       ├── config/         # Database connection
│       ├── controllers/    # Business logic
│       ├── middleware/      # Auth and error handling
│       ├── models/         # Mongoose schemas
│       ├── routes/         # API endpoints
│       ├── types/          # TypeScript interfaces
│       └── utils/          # Helper functions
└── client/          # React frontend
└── src/
├── components/     # Reusable UI components
├── context/        # Global state
├── hooks/          # Custom hooks
├── pages/          # Page components
├── services/       # API calls
└── types/          # TypeScript interfaces

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Backend

```bash
cd server
npm install
cp .env.example .env
# Fill in your MONGO_URI and JWT_SECRET in .env
npm run dev
```

### Frontend

```bash
cd client
npm install
npm start
```

## Docker Setup

```bash
cp .env.example .env
# Fill in your MONGO_URI and JWT_SECRET in .env
docker-compose up --build
```

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |

### Leads
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/leads | Get all leads with filters |
| POST | /api/leads | Create a lead |
| GET | /api/leads/:id | Get single lead |
| PUT | /api/leads/:id | Update a lead |
| DELETE | /api/leads/:id | Delete a lead (admin only) |
| GET | /api/leads/export | Export leads as CSV |

## Environment Variables

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development

## Role Based Access Control

| Feature | Admin | Sales User |
|---------|-------|------------|
| Create Lead | ✅ | ✅ |
| View Leads | ✅ | ✅ |
| Update Lead | ✅ | Own leads only |
| Delete Lead | ✅ | ❌ |
| Export CSV | ✅ | ✅ |