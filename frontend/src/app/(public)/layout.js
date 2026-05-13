import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Public Facing Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="grow container mx-auto px-4 py-8">{children}</main>

      {/* Professional Footer */}
      <Footer />
    </div>
  );
}
