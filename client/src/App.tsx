import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { useState } from "react";
import About from "./components/About";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={true} />
        <AppContent searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </QueryClientProvider>
    </Router>
  );
}

interface AppContentProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

function AppContent({ searchQuery, setSearchQuery }: AppContentProps) {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className="overflow-hidden">
      {!hideNavbar && (
        <NavBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/contacts"
          element={<Contacts searchQuery={searchQuery} />}
        />
      </Routes>
      {!hideNavbar && <Footer />}
    </div>
  );
}
