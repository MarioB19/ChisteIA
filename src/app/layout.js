
import "./globals.css";

export const metadata = {
  title: "ChisteIA",

};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
        <head>
        <link rel="icon" href="/logo.jpg" />
      </head>

      <body
       
      >
        {children}
      </body>
    </html>
  );
}
