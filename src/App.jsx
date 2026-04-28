import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchDonors from "./pages/SearchDonors";
import AddDonor from "./pages/AddDonor";
import Profile from "./pages/Profile";
import { Login, Register } from "./pages/AuthPages";
import NotFound from "./pages/NotFound";
import BecomeDonor from "./pages/BecomeDonor";

const AppContent = () => {

  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>


      <div className="app-container">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchDonors />} />
            <Route path="/add-donor" element={<AddDonor />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/become-donor" element={<BecomeDonor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
          <footer className="footer">
            🩸 Helping Hands — Saving Lives, One Drop at a Time |
            Built with React + Spring Boot + MySQL
          </footer>
      

      </div>

    </BrowserRouter>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;