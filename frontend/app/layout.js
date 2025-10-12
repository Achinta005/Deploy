import "./globals.css";

export const metadata = {
  title: "Frontend For Ml Models",
  description: "Serving Multiple Ml Models Functions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
