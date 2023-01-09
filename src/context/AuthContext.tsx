import React, { createContext, useEffect, useReducer } from "react";

type AuthState = typeof initialState;
type Action =
  | { type: "login"; payload: any }
  | { type: "logout"; payload: null };

interface AuthContextProps {
  children: React.ReactNode;
}

const initialState = { user: null };

const authReducer = (state: AuthState, action: Action) => {
  switch (action.type) {
    case "login":
      return {
        user: action.payload,
      };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

const AuthContextProvider = (props: AuthContextProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    dispatch({ type: "login", payload: user });
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ state, dispatch }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
