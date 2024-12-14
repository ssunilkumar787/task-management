# Task Management Application

A modern task management application built with React, Redux Toolkit, and TypeScript. This application allows users to manage their tasks with features like authentication, task filtering, and persistent storage.

## Features

### Authentication
- User registration and login
- Form validation using React Hook Form and Zod
- Persistent sessions using localStorage
- Secure password handling

### Task Management
- Create, read, update, and delete tasks
- Mark tasks as completed/incomplete
- Filter tasks by status (all, active, completed)
- Real-time updates
- Persistent storage of tasks per user

### Technical Features
- Type-safe development with TypeScript
- State management with Redux Toolkit
- Form validation with React Hook Form and Zod
- Modern UI with Tailwind CSS
- Icon integration with Lucide React

## Project Structure

```
src/
├── components/          # React components
│   ├── LoginForm.tsx   # Authentication form
│   └── TaskList.tsx    # Task management interface
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication logic
│   ├── useTasks.ts     # Task management logic
│   └── useStore.ts     # Redux store hooks
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup
│   └── slices/         # Redux slices
│       ├── authSlice.ts
│       ├── tasksSlice.ts
│       └── filterSlice.ts
├── schemas/            # Validation schemas
│   └── auth.ts         # Authentication schemas
├── types/              # TypeScript types
│   └── index.ts
└── utils/              # Utility functions
    └── storage.ts      # localStorage helpers
```

## Code Organization

### 1. Redux Store
- Organized into feature-based slices
- Type-safe actions and reducers
- Centralized state management
- Automatic persistence with localStorage

### 2. Components
- Focused, single-responsibility components
- Custom hooks for business logic
- Form validation with React Hook Form
- Responsive design with Tailwind CSS

### 3. Type Safety
- TypeScript for type checking
- Zod for runtime validation
- Type-safe Redux hooks
- Comprehensive type definitions

## Best Practices

### State Management
- Redux Toolkit for predictable state updates
- Slice pattern for modular state management
- Typed selectors and actions
- Middleware for side effects

### Code Quality
- Small, focused files
- Clear separation of concerns
- Reusable hooks and utilities
- Consistent error handling

### Form Handling
- Form validation with React Hook Form
- Schema-based validation with Zod
- Inline error messages
- Controlled inputs

### Storage
- Persistent state with localStorage
- User-specific data isolation
- Secure credential handling
- Efficient state updates

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Form Validation

The application uses React Hook Form with Zod for form validation:

- Username requirements:
  - 3-20 characters length
  - Required field

- Password requirements:
  - 6-50 characters length
  - Required field

Error messages are displayed below each input field when validation fails.

## State Management

Redux Toolkit is used for state management with three main slices:

1. `authSlice`: Handles user authentication state
2. `tasksSlice`: Manages task data and operations
3. `filterSlice`: Controls task filtering options

## Storage

The application uses localStorage for persistence:

- User credentials
- Authentication state
- Task data per user
- Filter preferences

