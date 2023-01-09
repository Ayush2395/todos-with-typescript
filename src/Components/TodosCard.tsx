import React, { FC, useState } from "react";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { CardsProps, ErrorProps } from "../interfaces/interfaces";
import useAuth from "../hooks/useAuth";

const TodosCard: FC<CardsProps> = ({
  _id,
  task,
  status,
  createdAt,
  getTaskId,
}) => {
  const [error, setError] = useState<ErrorProps>();
  const { state } = useAuth();
  const handleDeleteTask = async (docId: string | number) => {
    if (typeof docId === "string") {
      const response = await fetch("http://localhost:8000/api/todos/" + docId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${state.user.token}`,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setError({ error: true, msg: json.error });
        return;
      }

      if (response.ok) {
        setError({ error: false, msg: "Task Deleted" });
      }
    } else if (typeof docId === "number") {
      setError({ error: true, msg: "Invalid doc id" });
      return;
    }
  };
  return (
    <>
      {error?.msg && (
        <div
          className={`alert rounded-5 ${
            error?.error ? "alert-danger" : "alert-teal"
          }`}
        >
          {error?.msg}
        </div>
      )}
      <div className="card rounded-5 mb-5 shadow-lg p-3">
        <div className="card-body">
          <div className="card-title fw-bold display-4 text-purple">{task}</div>
          <p
            className={`fs-4 ${
              status === "checked" ? "text-teal" : "text-danger"
            }`}
          >
            Status: {status}
          </p>
          <div className="btn-group">
            <button
              className="btn btn-outline-warning"
              onClick={() => {
                if (typeof getTaskId !== "undefined") {
                  getTaskId(_id);
                }
              }}
            >
              <AiTwotoneEdit />
            </button>
            <button
              onClick={() => handleDeleteTask(_id)}
              className="btn btn-outline-pink-50"
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodosCard;
