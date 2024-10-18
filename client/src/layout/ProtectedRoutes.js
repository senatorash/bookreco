import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user, children }) => {
  if (!user) {
    // redirected to the authentication page
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};
export default ProtectedRoutes;
