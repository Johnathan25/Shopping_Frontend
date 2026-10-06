import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollToTop from "./services/scrollToTop";
import ProtectedRoute from "./services/protectRoutes";
import ProtectedAccess from "./services/protectAccess";
import AdminLayout from "./Layout/admin";
import CustomerLayout from "./Layout/Customer";
import SlugLayout from "./Layout/SlugLayout";
import PlatformLayout from "./Layout/PlatformLayout"; // ← ناقص عندك، عدّل المسار
import Home from "./pages/platform/home/home";
import Login from "./pages/platform/auth/login";
import Register from "./pages/platform/auth/signup";
import ForgetPassword from "./pages/platform/auth/forgetPassword";
import ResetPassword from "./pages/platform/auth/resetPassword";
import About from "./pages/platform/home/about";
import Contact from "./pages/platform/home/contact";
import Plans from "./pages/platform/home/plan";
import Features from "./pages/platform/home/features";
import Sketch from "./pages/platform/home/howToWork";
import Terms from "./pages/platform/home/terms";
import Complaints from "./pages/platform/home/complaints";
import StoreBuilder from "./website-builder/StoreBuilder";



function App() {
  const host = window.location.hostname;
  const isMain = host === import.meta.env.VITE_DOMAIN_NAME;

  return (
    <BrowserRouter>
      <ScrollToTop />

      {isMain ? (
        <Routes>
          {/* platform routes */}
          <Route element={<PlatformLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/About" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<Sketch />} />

            <Route path="/terms" element={<Terms />} />

            <Route path="/complaints" element={<Complaints />} />
          <Route path="/website" element={<StoreBuilder slug="ahmed" />} />












          </Route>

          {/* admin dashboard */}
          <Route
            path="/admin_dashboard"
            element={
              <ProtectedRoute>
                <ProtectedAccess role="admin">
                  <AdminLayout />
                </ProtectedAccess>
              </ProtectedRoute>
            }
          >
            {/* nested admin routes */}
          </Route>

          {/* customer dashboard */}
          <Route
            path="/customer_dashboard"
            element={
              <ProtectedRoute>
                <ProtectedAccess role="customer">
                  <CustomerLayout />
                </ProtectedAccess>
              </ProtectedRoute>
            }
          >
            {/* nested customer routes */}
          </Route>
        </Routes>
      ) : (
        <Routes>
          {/* slug layout routes */}
          <Route element={<SlugLayout />}>
            <Route path="/" element={<div></div>} />
          </Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;