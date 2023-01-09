import { useState } from "react";
import AddTask from "../Components/AddTask";
import TodosCard from "../Components/TodosCard";
import useFetch from "../hooks/useFetch";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { tasks } = useFetch("/", "GET");
  const [taskId, setTaskId] = useState<string>("");
  const { state } = useAuth();
  console.log(state.user);

  const getTaskId = (docId: string) => {
    if (typeof docId !== "undefined") {
      setTaskId(docId);
    }
  };

  return (
    <>
      <div className="row container-fluid mt-4">
        <div className="col-lg-8">
          {tasks?.map((item) => (
            <TodosCard
              key={item._id}
              _id={item._id}
              status={item.status}
              task={item.task}
              createdAt={item.createdAt}
              getTaskId={getTaskId}
            />
          ))}
        </div>
        <div className="col-lg-4">
          <div className="position-sticky top-50">
            <AddTask taskId={taskId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
