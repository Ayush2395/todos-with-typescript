import { FC } from "react";

type CardProps = {
  task: string;
  status: string;
  date: string;
  id: string;
};

const TodosCard: FC<CardProps> = ({ task, status, date, id }) => {
  return (
    <>
      <div className="card w-100">
        <div className="card-body">
          <div className="card-title fs-2 fw-semibold">{task}</div>
          <p className={`fs-5 ${status === "checked" ? "text-teal" : "text-danger"}`}>
            {status}
          </p>
          <p className="text-warning">{date.slice(0, 10)}</p>
          <div className="w-100">
            <button className="btn btn-outline-warning mx-1">Edit</button>
            <button className="btn btn-outline-danger mx-1">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodosCard;
