import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoutes = ({ user, children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user exists and update loading state
    if (user) {
      setLoading(false); // User is authenticated
    } else {
      setLoading(true); // User is not authenticated
    }
  }, [user]);

  // Show a loading spinner until the user state is verified
  if (loading) {
    return <div style={{ marginTop: "80px", color: "red" }}>Loading...</div>;
  }

  // If user is not authenticated, redirect to sign-in page
  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // If user is authenticated, render the protected content (children)
  return children;
};

export default ProtectedRoutes;

// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useGenerateNewAccessTokenMutation } from "../lib/apis/authApis";

// const ProtectedRoutes = ({ user, children }) => {
//   const [loading, setLoading] = useState(true);
//   // const [generateNewAccessToken] = useGenerateNewAccessTokenMutation();

//   useEffect(() => {
//     const verifyAuth = async () => {
//       if (!user) {
//         // Attempt to refresh the access token
//         // const token = await generateNewAccessToken();

//         // if (!token) {
//         // Redirect to sign-in if token generation fails
//         setLoading(false);
//         return <Navigate to="/auth/signin" replace />;
//         // }
//       }
//       // Authentication verified
//       setLoading(false);
//     };

//     verifyAuth();
//   }, [user]);

//   // Display a loading spinner or blank state until authentication is verified
//   if (loading) {
//     return <div>Loading...</div>; // Replace with a spinner or skeleton loader if desired
//   }

//   // Render protected content if authenticated
//   return children;
// };

// export default ProtectedRoutes;
