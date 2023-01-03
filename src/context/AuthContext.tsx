import { createContext, useContext, useEffect, useReducer } from "react";

export const AuthContext = createContext(null);

const authReducer = (state: any, action: { type: string; payload: any }) => {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
      };
    case "logout":
      return {
        user: null,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch({ type: "login", payload: user });
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;

export function useAuth(): any {
  return useContext(AuthContext);
}
