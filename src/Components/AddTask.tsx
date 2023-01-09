import React, { useState } from "react";
import { ErrorProps, TodosData } from "../interfaces/interfaces";
import useAppState from "../hooks/useAppState";
import useAuth from "../hooks/useAuth";

interface AddTaskProps {
  taskId: string;
}

const AddTask = ({ taskId }: AddTaskProps) => {
  const defaultFormValue = { task: "", status: "" };
  const [todos, setTodos] = useState<TodosData>(defaultFormValue);
  const [error, setError] = useState<ErrorProps>();

  const { task, status } = todos;

  const { dispatch } = useAppState();
  const { state } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodos((prevValue) => ({ ...prevValue, [e.target.id]: e.target.value }));
  };

  const handleSubmitTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ error: false, msg: "" });

    if (!task || !status) {
      return setError({ error: true, msg: "Enter your task" });
    }

    // if (taskId !== undefined && taskId !== null) {
    //   const updateTaskResponse = await fetch(
    //     `http://localhost:8000/api/todos/${taskId}`,
    //     {
    //       method: "PATCH",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({ task, status }),
    //     }
    //   );

    //   const updateJson = await updateTaskResponse.json();
    //   if (!updateTaskResponse.ok) {
    //     setError({ error: true, msg: updateJson.error });
    //     return;
    //   }
    //   if (updateTaskResponse.ok) {
    //     setError({ error: false, msg: "Your task added" });
    //     setTodos({ task: "", status: "" });
    //     dispatch({ type: "create-task", payload: updateJson });
    //   }
    // } else {
    //   const addTaskResponse = await fetch("http://localhost:8000/api/todos", {
    //     method: "POST" as "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ task, status }),
    //   });

    //   const json = await addTaskResponse.json();

    //   if (!addTaskResponse.ok) {
    //     setError({ error: true, msg: json.error });
    //     return;
    //   }
    //   if (addTaskResponse.ok) {
    //     setError({ error: false, msg: "Your task added" });
    //     setTodos(json);
    //     dispatch({ type: "create-task", payload: json });
    //   }
    // }
    const addTaskResponse = await fetch("http://localhost:8000/api/todos", {
      method: "POST" as "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${state.user?.token}`,
      },
      body: JSON.stringify({ task, status }),
    });

    const json = await addTaskResponse.json();

    if (!addTaskResponse.ok) {
      setError({ error: true, msg: json.error });
      return;
    }
    if (addTaskResponse.ok) {
      setError({ error: false, msg: "Your task added" });
      setTodos(json);
      dispatch({ type: "create-task", payload: json });
    }
  };

  return (
    <>
      {error?.msg && (
        <div
          className={`alert rounded-5 ${
            error?.error ? "alert-danger" : "alert-success"
          }`}
        >
          {error?.msg}
        </div>
      )}
      <div className="card rounded-5 mb-3">
        <div className="card-body">
          <div className="card-title text-center fw-semibold fs-4">
            Add your Task
          </div>
          <form onSubmit={handleSubmitTask}>
            <div className="form-group mb-3">
              <label htmlFor="task" className="form-label">
                Task
              </label>
              <input
                value={task}
                onChange={handleChange}
                type="text"
                name="task"
                id="task"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <input
                value={status}
                onChange={handleChange}
                type="text"
                name="status"
                id="status"
                className="form-control"
              />
            </div>
            <button
              type="submit"
              className="btn btn-purple-25 w-100 text-white shadow mb-3"
            >
              Add Task
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
