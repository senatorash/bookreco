import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoutes;
