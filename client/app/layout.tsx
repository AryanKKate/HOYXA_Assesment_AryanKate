import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meghdo – Find a Tutor',
  description: 'Tutor Search & Discovery — Meghdo EdTech Marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">{children}</body>
    </html>
  );
}
