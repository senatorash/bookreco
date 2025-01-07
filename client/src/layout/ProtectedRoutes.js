import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user, children }) => {
  const accessToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));
  console.log(accessToken);
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoutes;
