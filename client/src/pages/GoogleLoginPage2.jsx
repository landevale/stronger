import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
// import { client } from "../client";
import jwt_decode from "jwt-decode";

const GoogleLoginPage2 = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    console.log("Response", response);
    console.log("Response Credentials", response.credential);
    const userObject = jwt_decode(response.credential);
    console.log("userObject", userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, sub, email, picture } = userObject;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      email: email,
      image: picture,
    };
    console.log(doc);
    // client.createIfNotExists(doc).then(() => {
    //   navigate("/", { replace: true });
    // });
  };

  return (
    <div className="">
      <div className="">
        <GoogleOAuthProvider
          clientId={`${import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}`}
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

export default GoogleLoginPage2;
