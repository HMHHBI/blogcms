import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "HMHHBI | Software Engineer & Blogger",
    template: "%s | HMHHBI", // Isse har page ka title dynamic ho jayega (e.g. "My Post | HMHHBI")
  },
  description: "Personal blog and CMS for AI and Engineering insights.",
  keywords: [
    "Software Engineering",
    "Laravel",
    "Next.js",
    "AI",
    "Hassan Bin Imran",
  ],
  authors: [{ name: "Hassan Bin Imran" }],
  openGraph: {
    title: "HMHHBI | Engineering Insights",
    description: "Deep dives into Laravel, Next.js and AI.",
    url: "https://blog.hmhhbi.com",
    siteName: "HMHHBI Blog",
    images: [
      {
        url: "/header.png", // Public folder mein aik image rakhein share hone ke liye
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HMHHBI | Software Engineer",
    description: "Insights about software engineering and AI.",
    creator: "@hmhhbi",
    images: ["/header.png"],
  },
};

// Metadata ke niche ye bhi add karein
export const viewport = {
  themeColor: "#7c3aed", // Violet-600 color jo humne theme ke liye chuna hai
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col selection:bg-violet-100 selection:text-violet-600">
        {children}
      </body>
    </html>
  );
}
