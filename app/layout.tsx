import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import './globals.css';

export const metadata = {
  title: 'URL Shortener',
  description: 'Shorten your URLs seamlessly',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Favicon for most browsers */}
          <link rel="icon" href="/favicon.ico" />

          {/* Apple-specific Touch Icon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

          {/* Additional favicons for various devices */}
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

          {/* Android-specific icons */}
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

          {/* Manifest for PWA */}
          <link rel="manifest" href="/manifest.json" />

          {/* Theme Color */}
          <meta name="theme-color" content="#ffffff" />

          {/* Fallback for browsers that don't support theme-color */}
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </head>
        <body>
          <header className="flex justify-between items-center p-4 bg-gray-100">
            {/* Show the UserButton only if the user is signed in */}
            <SignedIn>
              <UserButton />
            </SignedIn>
            {/* Show the SignInButton if the user is not signed in */}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <a href="https://github.com/ajoshi3010/url-shortener"><img src="https://img.icons8.com/?size=100&id=106567&format=png&color=000000" height={30} width={30} alt="git hub repo" /></a>
          </header>

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
