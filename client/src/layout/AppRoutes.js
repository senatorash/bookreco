import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoutes from "./ProtectedRoutes";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import SigninForm from "../components/authComponents/SigninForm";
import SignupForm from "../components/authComponents/SignupForm";
import VerifyAccountForm from "../components/authComponents/VerifyAccountForm";
import ResetPasswordForm from "../components/authComponents/ResetPasswordForm";
import UpdatePasswordForm from "../components/authComponents/UpdatePasswordForm";
import AboutPage from "../pages/AboutPage";
import CategoryPage from "../pages/CategoryPage";
import ContactPage from "../pages/ContactPage";
import BookPage from "../pages/BookPage";
import Dashboard from "../components/dashboard/DashBoard";

const AppRoutes = () => {
  const { user } = useSelector((state) => state.userState);
  return (
    <Routes>
      <Route
        path="*"
        element={<h1 style={{ marginTop: "100px" }}>Page Not Found</h1>}
      />
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/contact-us" element={<ContactPage />} />
      {/* <Route path="/books" element={<BookPage />} /> */}

      <Route path="/auth" element={<AuthPage />} />

      <Route path="/auth" element={<AuthPage />}>
        <Route path="signin" element={<SigninForm />} />
        <Route path="signup" element={<SignupForm />} />
        <Route path="verify" element={<VerifyAccountForm />} />
        <Route path="reset-password" element={<ResetPasswordForm />} />
        <Route path="update-password" element={<UpdatePasswordForm />} />
      </Route>

      <Route
        path="/books"
        element={
          <ProtectedRoutes user={user}>
            <BookPage />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes user={user}>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
