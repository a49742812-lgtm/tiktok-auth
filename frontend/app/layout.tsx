// frontend/app/layout.tsx
import React from 'react';
import '../styles/globals.css';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
}
