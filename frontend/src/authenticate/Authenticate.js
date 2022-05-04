import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Authenticate() {
  const [userId, setUserId] = useState("");
  const [isOldToken, setIsOldToken] = useState(false)
  const navigate = useNavigate();

  const authenticate = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/auth`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      const data = await res.json();

      setUserId(data._id);
      if(data.tokens.length >= 2){
          setIsOldToken(true)
      }

      if (!data.status === 200) {
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  
  const flushOldToken = async () => {
     try {
        await fetch(`${process.env.REACT_APP_BASE_URL}/removeToken/${userId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          });

     } catch (error) {
         console.log(error)
     }
  };

  useEffect(() => {
    authenticate();

    if(isOldToken){
       flushOldToken()
    }
  });

  return (
    <div style={{ display: "none" }}>
      <h1>Test</h1>
    </div>
  );
}

export default Authenticate;
