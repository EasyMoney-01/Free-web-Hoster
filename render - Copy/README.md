# Render.com Clone

A full-stack clone of Render.com built with Next.js, Tailwind CSS, and MongoDB.

## Features

- User authentication with JWT
- Service deployment simulation
- Dashboard with service management
- Real-time deployment logs
- Responsive UI with dark mode support

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB with Mongoose
- **Deployment**: Simulated deployment flow

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── api/             # API routes
│   ├── dashboard/       # Dashboard page
│   ├── login/           # Login page
│   ├── service/[id]/    # Service detail page
│   └── signup/          # Signup page
├── components/          # React components
├── lib/                 # Utility functions
└── models/              # Database models
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   MONGODB_URI=mongodb://localhost:27017/render-clone
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Run MongoDB**:
   Make sure MongoDB is running on your system.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Visit `http://localhost:3000` to see the application.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Login and get JWT token

### Services
- `GET /api/services` - Get all services for the authenticated user
- `POST /api/services` - Create a new service
- `GET /api/services/:id` - Get a specific service
- `DELETE /api/services/:id` - Delete a service

## Deployment Simulation

When a user creates a service, the application simulates a deployment flow:
1. **Queued** - Service is queued for deployment
2. **Building** - Application is being built
3. **Live** or **Failed** - Final deployment status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.