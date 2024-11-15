
# URL Shortener

A URL Shortener application built with Next.js, Clerk for authentication, and Prisma for database management. This project allows users to shorten long URLs and manage their links efficiently.

## Features

- **Create Short URLs:** Generate short URLs for long links.
- **Manage Links:** View and manage your created short links.
- **Authentication:** Sign in using Clerk to manage your URLs securely.
- **Responsive Design:** Accessible from both desktop and mobile devices.

## Getting Started

To set up the project locally, follow these instructions:

### Prerequisites

- **Node.js**: Ensure you have Node.js (>=16.x) installed.
- **npm**: Ensure you have npm (>=8.x) installed.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ajoshi3010/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the required environment variables. Example:

   ```env
   DATABASE_URL=your-database-url
   CLERK_FRONTEND_API=your-clerk-frontend-api
   CLERK_API_KEY=your-clerk-api-key
   ```

4. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser to view the application.

## Using the CLI Tool

You can use `npx` to quickly set up the project with a single command. This will clone the repository and set up the project for you:

```bash
npx url-shortener-aj
```

### CLI Tool Overview

- **`npx url-shortener`**: This command will automatically fetch the URL Shortener project from GitHub, set up the directory, and install all necessary dependencies.

## Usage

- **Create a Short URL:** Go to the URL Shortener page and enter your long URL to get a shortened version.
- **Manage Links:** Use the management interface to view, edit, or delete your shortened URLs.
- **Sign In:** Use Clerk’s Sign In Button to log in and access your URL management features.

## Deployment

To deploy the application, follow these steps:

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Deploy to your hosting provider (e.g., Vercel):**

   You can deploy directly from your GitHub repository using Vercel or another hosting service of your choice.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.


## Contact

For any questions or support, please contact [vuddawaranirudhjoshi03@gmail.com](mailto:your-email@example.com).

```

pranu