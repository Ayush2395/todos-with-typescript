import { createContext, useReducer } from "react";

const initialState = {
  todos: null || [],
};

interface ContextProps {
  children: React.ReactNode;
}

type AppState = typeof initialState;
type Action =
  | { type: "create-task"; payload: any }
  | { type: "get-task"; payload: any }
  | { type: "delete-task"; payload: any };

const appReducer = (state: AppState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "create-task":
      return {
        ...state,
        todos: [payload],
      };
    case "get-task":
      return {
        todos: payload,
      };
    case "delete-task":
      return {
        todos: state.todos.filter((task: any) => task._id !== payload._id),
      };
    default:
      return state;
  }
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const AppContextProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <>
      <AppContext.Provider value={{ state, dispatch }}>
        {children}
      </AppContext.Provider>
    </>
  );
};
