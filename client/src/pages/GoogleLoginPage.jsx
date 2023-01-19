import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginPage = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  console.log("Client ID", import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN);

  return (
    <div className="">
      <div className="">
        <GoogleOAuthProvider
          clientId={`${import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}`} //{`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
        >
          <GoogleLogin
            render={(renderProps) => (
              <button
                type="button"
                className=""
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="" /> Sign in with google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default GoogleLoginPage;
