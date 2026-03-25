import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import { ChatProvider } from '@/context/ChatContext';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: 'ChatApp — Modern Messaging',
  description: 'A beautiful, modern real-time chat application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-surface min-h-screen antialiased`}>
        <ThemeProvider>
          <ChatProvider>
            <Navbar />
            <main className="pt-14 min-h-[calc(100vh-3.5rem)]">
              {children}
            </main>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
