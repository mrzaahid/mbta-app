import  { inter } from '@/app/ui/fonts'
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
