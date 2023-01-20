import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
// import { hasGrantedAllScopesGoogle } from "@react-oauth/google";
// import { client } from "../client";
// import jwt_decode from "jwt-decode";

const GoogleLoginPage3 = () => {
  // const navigate = useNavigate();

  // const responseGoogle = (response) => {
  //   console.log("Response", response);
  //   console.log("Response Credentials", response.credential);
  //   const userObject = jwt_decode(response.credential);
  //   console.log("userObject", userObject);
  //   localStorage.setItem("user", JSON.stringify(userObject));
  //   const { name, sub, email, picture } = userObject;
  //   const doc = {
  //     _id: sub,
  //     _type: "user",
  //     userName: name,
  //     email: email,
  //     image: picture,
  //   };
  //   console.log(doc);
  //   // client.createIfNotExists(doc).then(() => {
  //   //   navigate("/", { replace: true });
  //   // });
  // };

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => console.log(codeResponse),
  //   flow: "auth-code",
  // });

  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const response = await fetch("/auth/google", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: { "Content-Type": "application/json" },
      });

      const tokens = await response.json();
      console.log(tokens);
    },
    flow: "auth-code",
  });

  return (
    <div className="">
      <div className="">
        <Button onClick={() => login()}>Sign in with Google 🚀 </Button>;
      </div>
    </div>
  );
};

export default GoogleLoginPage3;
