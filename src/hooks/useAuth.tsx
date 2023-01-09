import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuth hook can be used inside AuthContextProvider");
  }

  return context;
};

export default useAuth;
