# rnTestTask

This project is a React Native application focused on user authentication and cascading post and comment functionality. The app allows users to create accounts locally on their devices and manage posts and comments with a structured layout. The main screen is accessible only to authorized users, and it supports pagination and nested comments display.

## Features

- **User Registration:** Users can create an account with a mandatory email and a username (alphanumeric).
- **Authentication:** Only authenticated users can access the main screen.
- **Post and Comment System:**
  - Users can add multiple posts.
  - Comments can be added to each post, with support for nested (cascading) comments.
  - The main comments are displayed in a table format, while replies are shown in a tree structure.
- **Pagination:** Posts and comments are paginated, with 25 messages per page.

## Project Structure

```plaintext
src/
  app/
    components/   # Main app components
    screens/      # Screens for the main app

  common/
    components/   # Reusable common components
    hooks/        # Common hooks
    utils/        # Common utilities

  services/
    implementations/  # Service implementations (e.g., database operations)
    interfaces/       # Service interfaces
    index.ts          # Entry point for services

  ui-kit/
    Button/           # Button components
    ...
    index.ts          # Entry point for UI Kit

  ui-modules/
    <uiModuleName>/
      components/     # Main components for UI modules
      hooks/          # Hooks for main UI modules
      utils/          # Utilities for main UI modules

constants.ts    # Constants for the whole app
```

## Prerequisites

Ensure that you have the following installed:

- **Node.js** (v18 or newer)
- **Yarn** (preferred over npm)

## Getting Started

1. **Clone the repository:**

   ```bash
   git@github.com:abrahamyanhrant93/rnTestTask.git
   cd rnTestTask
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Install iOS dependencies (if on macOS):**

   ```bash
   yarn pod
   ```

4. **Start the development server:**

   ```bash
   yarn start
   ```

5. **Run the app:**

   - For Android: `yarn android`
   - For iOS: `yarn ios`

## Scripts

- **`yarn android`** - Builds and runs the app on an Android emulator or connected device.
- **`yarn ios`** - Builds and runs the app on an iOS simulator or connected device.
- **`yarn pod`** - Installs iOS dependencies.
- **`yarn build:apk`** - Builds the Android APK for release.
- **`yarn build:aab`** - Builds the Android App Bundle (AAB) for release.
- **`yarn lint`** - Lints the project files using ESLint.

## Technologies Used

- **React Native**: For building cross-platform mobile applications.
- **TypeScript**: For type-safe development.
- **SQLite**: For local storage of user data.
- **React Navigation**: For handling navigation within the app.
- **React Hook Form**: For managing form state and validation.

## Development Guidelines

- Follow coding standards enforced by ESLint and Prettier.
- Keep components small and focused (120 lines maximum per each).
- Use hooks for managing state and side effects.
- Separate concerns by placing utility functions in the `utils` folder.
