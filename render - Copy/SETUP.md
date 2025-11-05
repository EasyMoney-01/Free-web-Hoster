# Setup Instructions

## Prerequisites

1. Node.js (version 16 or higher)
2. MongoDB (running locally or remote instance)

## Installation Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file in the root directory with the following:
   ```
   MONGODB_URI=mongodb://localhost:27017/render-clone
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Run MongoDB**:
   Make sure MongoDB is running on your system. If you don't have MongoDB installed:
   - Download from: https://www.mongodb.com/try/download/community
   - Or use Docker: `docker run --name mongodb -p 27017:27017 -d mongo`

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Visit `http://localhost:3000` to see the application.

## Troubleshooting

If you encounter any issues:

1. **Missing dependencies**: Run `npm install` again
2. **TypeScript errors**: These will resolve once dependencies are installed
3. **MongoDB connection errors**: 
   - Ensure MongoDB is running
   - Check your MONGODB_URI in `.env.local`
4. **Port conflicts**: The app runs on port 3000 by default

## Building for Production

To create a production build:
```bash
npm run build
```

To start the production server:
```bash
npm start
```