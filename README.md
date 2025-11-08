# KPick-Me CV Generator - Frontend

AI-powered job search platform helping students find employment through CV generation, interview simulation, and skills training.

## Technologies

- Next.js 15 + TypeScript
- React 19
- TailwindCSS
- Google OAuth authentication
- Axios for API calls

## Quick Start

```bash
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

## Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Features

### Authentication
- Google OAuth login
- Secure JWT token storage
- Automatic redirect on unauthorized access

### Dashboard
- User statistics and progress
- CV management
- Interview history
- Training progress

### CV Builder
- Wizard with validation
- 3 templates: Modern, Classic, Creative
- AI generation and enhancement
- Export to PDF, DOCX, JSON

### Interview Simulator
- 8 interview questions
- Timer tracking
- Feedback and scoring
- Summary report

### Training
- JavaScript, TypeScript, React quizzes
- Progress tracking
- Score calculation

## Error Pages

### 403 Forbidden (`/403`)
- Shown when user lacks permission
- Option to sign in with Google
- Back to home button

### 401 Unauthorized (`/unauthorized`)
- Shown when authentication required
- Google OAuth sign-in button
- Redirected automatically when accessing protected routes

### 404 Not Found (`/not-found`)
- Custom 404 page
- Navigation to popular pages
- Back to home button

## Protected Routes

The following routes require authentication:
- `/dashboard`
- `/interviews`
- `/training`

Middleware automatically redirects unauthenticated users to `/unauthorized`.

## Authentication Flow

1. User clicks "Sign in with Google" on any page
2. Redirected to backend: `${API_URL}/auth/google`
3. Google OAuth consent screen
4. Backend handles OAuth callback
5. Redirected to: `/auth/success?token=JWT_TOKEN`
6. Token stored in localStorage and cookies
7. User redirected to `/dashboard`

## API Integration

All API calls use axios with interceptors:
- Automatically adds JWT token to requests
- Handles 401 errors (redirect to `/unauthorized`)
- Handles 403 errors (redirect to `/403`)

## Development

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```
app/
├── 403/              # Forbidden page
├── unauthorized/     # Unauthorized page
├── not-found.tsx     # 404 page
├── auth/
│   └── success/      # OAuth callback handler
├── dashboard/        # Main dashboard
├── interviews/       # Interview simulator
└── training/         # Skills training

components/
├── landing/          # Landing page components
└── ui/               # Reusable UI components

lib/
├── api.ts            # Axios configuration
├── hooks/
│   └── useAuth.tsx   # Authentication hook
└── services/         # API service layers

middleware.ts         # Route protection
```

## Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Set `NEXT_PUBLIC_API_URL` to your backend URL in production.

## License

MIT
