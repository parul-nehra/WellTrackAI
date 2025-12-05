# WellTrackAI

WellTrackAI is a comprehensive health and wellness tracking application designed to help users monitor their activities, goals, and health metrics. It features a modern dashboard, AI-powered insights, and secure authentication.

## 🚀 Live Links

- **Frontend**: [https://well-track-ai.vercel.app/](https://well-track-ai.vercel.app/)
- **Backend**: [https://welltrackai.onrender.com](https://welltrackai.onrender.com)
- **Repository**: [https://github.com/parul-nehra/WellTrackAI](https://github.com/parul-nehra/WellTrackAI)

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: JWT & bcrypt
- **AI Integration**: Google Gemini API

## ✨ Features

- **User Authentication**: Secure Sign Up and Login functionality.
- **Dashboard**: Overview of user progress and daily stats.
- **Profile Management**: Update user details and settings.
- **Activity Tracking**: Log and view daily physical activities.
- **Goal Setting**: Set and track personal health goals.
- **Health Metrics**: Monitor vital health statistics.
- **AI Insights**: Get personalized health advice powered by Gemini AI.
- **Progress Monitoring**: Visual representation of your journey.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL installed and running

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    PORT=8000
    NODE_ENV=development
    DATABASE_URL="postgresql://user:password@localhost:5432/welltrackai"
    JWT_SECRET="your_super_secret_key"
    GEMINI_API_KEY="your_gemini_api_key"
    FRONTEND_URL="http://localhost:3000"
    ```

4.  **Run Database Migrations:**
    ```bash
    npx prisma migrate dev --name init
    ```

5.  **Start the Backend Server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:8000`.

### Frontend Setup

1.  **Navigate to the root directory (if not already there):**
    ```bash
    cd ..
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

4.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 📡 API Endpoints

The backend exposes the following API routes (prefixed with `/api`):

-   `/auth`: Authentication (Register, Login, Logout)
-   `/profile`: User profile management
-   `/progress`: Progress tracking data
-   `/activities`: Activity logging and retrieval
-   `/goals`: Goal setting and management
-   `/health`: Health metrics tracking
-   `/ai`: AI-generated insights

## 🔍 Pagination, Filtering & Sorting

The backend API supports advanced data retrieval features for efficient data management.

### Activities (`/api/activities`)
- **Pagination**: Use `page` and `limit` query parameters.
- **Filtering**:
  - `search`: Filter by activity name (case-insensitive).
  - `startDate` & `endDate`: Filter by date range.
- **Sorting**: Automatically sorted by date (descending).

### Goals (`/api/goals`)
- **Pagination**: Use `page` and `limit` query parameters.
- **Filtering**:
  - `search`: Filter by goal title (case-insensitive).
  - `status`: Filter by status (e.g., "In Progress", "Completed").
  - `category`: Filter by category (e.g., "Fitness", "Nutrition").
- **Sorting**: Automatically sorted by creation date (descending).

### Health Metrics (`/api/health`)
- **Pagination**: Use `page` and `limit` query parameters.
- **Filtering**:
  - `type`: Filter by metric type (e.g., "Water", "Sleep").
- **Sorting**: Automatically sorted by date (descending).

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
