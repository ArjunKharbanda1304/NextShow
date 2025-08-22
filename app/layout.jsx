import "./globals.css"

export const metadata = {
  title: "NextShow - Movie Booking Platform",
  description: "Book movie tickets online with ease",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
