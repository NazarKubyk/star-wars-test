import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const token = credentialResponse.credential;
    localStorage.setItem("token", token!);
    navigate("/");
  };

  const handleGoogleFailure = () => {
    console.log("Google Login Failed");
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      <div className="login">
        <h1>Welcome to the test task</h1>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />

         
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
