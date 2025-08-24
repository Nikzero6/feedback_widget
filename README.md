# Feedback Widget

A customizable feedback collection widget with admin dashboard, built with Next.js, TypeScript, and Prisma.

## What's Implemented

- **Widget System**: Embeddable feedback widget supporting multiple question types (Boolean, Rating, Text, Multiple Choice)
- **Admin Dashboard**: Full question and response management with real-time updates
- **Authentication**: JWT-based admin access with middleware protection
- **Real-time Updates**: Server-Sent Events for live dashboard updates
- **Database**: PostgreSQL with Prisma ORM
- **API**: RESTful endpoints with public and protected routes

## Features

- **Question Types**: Boolean (Yes/No), Rating (1-5 stars), Text input, Multiple choice
- **Widget Customization**: Position, colors, theme, size, auto-hide
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Dashboard**: Live response updates via SSE
- **Secure Admin Access**: Protected routes with JWT authentication
- **Data Export**: View all responses with metadata (IP, User Agent, Timestamp)

## Quick Start

### Prerequisites

- Node.js 20+
- PostgreSQL database
- npm

### Setup from ZIP

1. **Extract and Install**

   ```bash
   # download the zip file
   unzip feedback_widget.zip
   # or clone the repository
   git clone https://github.com/nikzero6/feedback_widget.git
   # go to the project directory
   cd feedback_widget
   # install the dependencies
   npm install
   ```

2. **Environment Setup**

   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/feedback_widget"
   JWT_SECRET="nikhil-rai-editoriallist"
   ADMIN_USERNAME="admin"
   ADMIN_PASSWORD="admin123"
   ```

3. **Database Setup**

   ```bash
   npm run db:setup
   npm run db:seed
   ```

4. **Build and Start**

   ```bash
   npm run build
   npm run start
   ```

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/            # Reusable UI components
├── features/              # Feature-based modules
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── types/                 # TypeScript definitions
└── widget/                # Widget source code
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:setup` - Set up database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio
- `npm run widget:compile` - Compile widget TypeScript to JavaScript

## Testing the Project

### 1. Access the Application

- **Landing Page**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/dashboard
- **Default Credentials**: admin / admin123

### 2. Create Questions

1. Go to Dashboard → Questions tab
2. Click "Add Question"
3. Choose question type and fill details
4. Publish the question

### 3. Test Widget

1. Visit http://localhost:3000/widget-test.html
2. Widget should appear with your questions
3. Submit responses
4. Check dashboard for real-time updates

## Widget Integration

### Basic Usage

```html
<script>
  window.FeedbackWidgetConfig = {
    position: "bottom-right",
    primaryColor: "#007bff",
    secondaryColor: "#0056b3",
    backgroundColor: "#ffffff",
    textColor: "#333333",
    width: "400px",
    height: "500px",
    feedbackTitle: "How was your experience?",
    thankYouMessage: "Thank you for your feedback!",
    autoHide: true,
  };
</script>
<script src="http://localhost:3000/widget/index.js" type="module"></script>
```

### Configuration Options

- `position`: top-left, top-right, bottom-left, bottom-right, center
- `theme`: light, dark, auto
- `primaryColor`: Main accent color
- `width`/`height`: Widget dimensions
- `autoHide`: Auto-hide after submission

## API Endpoints

### Public (No Auth)

- `POST /api/public/auth/login` - Admin login
- `GET /api/public/questions/published` - Get published questions
- `POST /api/public/responses/multiple` - Submit multiple responses

### Protected (Admin Auth)

- `GET /api/questions` - List all questions
- `POST /api/questions` - Create question
- `PUT /api/questions/[id]` - Update question
- `DELETE /api/questions/[id]` - Delete question
- `GET /api/responses` - List all responses
- `GET /api/sse` - Server-Sent Events stream

## Database Schema

- **Questions**: id, text, type, options, isPublished, timestamps
- **Responses**: id, questionId, answer, metadata, timestamps
- **Relations**: One-to-many between questions and responses
