import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user, children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async check for authentication status
    const checkAuthentication = async () => {
      try {
        // Simulate delay for async operation
        await new Promise((resolve) => setTimeout(resolve, 500)); // Replace this with actual logic if necessary
      } catch (error) {
        // console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    // Show a loading spinner or message while checking authentication
    return (
      <div
        style={{
          marginTop: "100px",
          color: "red",
          fontSize: "30px",
          marginLeft: "100px",
          fontWeight: "bold",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    // Redirect to the sign-in page if not authenticated
    return <Navigate to="/auth/signin" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoutes;
