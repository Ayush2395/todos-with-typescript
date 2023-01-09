import { useEffect, useState } from "react";
import { CardsProps } from "../interfaces/interfaces";
import useAuth from "./useAuth";

const useFetch = (url: string, method: string) => {
  const [tasks, setTasks] = useState<CardsProps[]>();
  const { state } = useAuth();

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:8000/api/todos${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${state.user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
      }

      if (response.ok) {
        setTasks(json);
      }
    };
    fetchTask();
  }, [tasks, method, url, state.user]);

  return { tasks };
};

export default useFetch;
