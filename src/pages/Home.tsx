import { useEffect, useState } from "react";
import TodosCard from "../components/TodosCard";
import { useAuth } from "../context/AuthContext";

type HomeProps = {
  task: string;
  status: string;
  createdAt: string;
  _id: string;
};

const Home = () => {
  const [todos, setTodos] = useState<HomeProps[]>();
  const [error, setError] = useState<{ error: boolean; msg: string }>();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleTaskSubmission = async (e: any) => {
    e.preventDefault();

    if (!tasks) return setError({ error: true, msg: "Write your task first" });

    const response = await fetch("http://localhost:8000/api/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify({ task: tasks, status }),
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
    }
    if (response.ok) {
      console.log(json);
    }
  };

  useEffect(() => {
    const handleTask = async () => {
      const res = await fetch("http://localhost:8000/api/todos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setError({ error: true, msg: json.error });
      }
      if (res.ok) {
        setTodos(json);
      }
    };
    handleTask();
  }, [todos, user]);

  return (
    <div className="section container">
      {error?.msg && (
        <div
          className={`alert ${error?.error ? "alert-danger" : "alert-success"}`}
        >
          {error?.msg}
        </div>
      )}
      <div className="row">
        <div className="col-12 col-sm-12 col-md-8">
          {todos?.map((todo) => (
            <div className="col-12 my-3" key={todo._id}>
              <TodosCard
                task={todo.task}
                status={todo.status}
                date={todo.createdAt}
                id={todo._id}
              />
            </div>
          ))}
        </div>
        <div className="card h-75 col-12 col-sm-12 col-md-4 mt-3 position-sticky top-0">
          <div className="card-body">
            <form onSubmit={handleTaskSubmission}>
              <div className="form-group mb-3">
                <label htmlFor="task" className="form-label">
                  Task
                </label>
                <input
                  value={tasks}
                  onChange={(e) => setTasks(e.target.value)}
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
                  onChange={(e) => setStatus(e.target.value)}
                  type="text"
                  name="status"
                  id="status"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-teal">
                Add Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
