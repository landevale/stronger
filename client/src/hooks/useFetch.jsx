import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Pass URL
const useFetch = (url) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Pass response from Google
  const handleGoogle = async (response) => {
    setLoading(true);
    // Send response to server
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ credential: response.credential }),
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          // localStorage.setItem("user", JSON.stringify(data?.user));
          // localStorage.setItem("token", JSON.stringify(data?.user.token));
          localStorage.setItem("token", JSON.stringify(data?.token));
          window.location.reload();
          navigate("/");
        }

        throw new Error(data?.message || data);
      })
      .catch((error) => {
        setError(error?.message);
      });
  };
  return { loading, error, handleGoogle };
};

export default useFetch;
