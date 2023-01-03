import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const useAuthentication = (api: string) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{ error: boolean; msg: string }>();

  const { dispatch } = useAuth();

  const handleAuth = async (e: any) => {
    e.preventDefault();
    setError({ error: false, msg: "" });

    if (!email || !password) {
      return setError({ error: true, msg: "check all input fields" });
    }

    const response = await fetch(`http://localhost:8000${api}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      return setError({ error: true, msg: json.error });
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "login", payload: json });
    }
  };

  return { email, setEmail, password, setPassword, handleAuth, error };
};

export default useAuthentication;
