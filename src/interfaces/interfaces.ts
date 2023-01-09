export interface ErrorProps {
  error: boolean;
  msg: string;
}

export type TodosData = {
  task: string;
  status: string;
};

export interface CardsProps {
  _id: string;
  createdAt?: string;
  task: string;
  status: string;
  getTaskId?: Function;
}

export type Authentication = {
  email: string;
  password: string;
};
