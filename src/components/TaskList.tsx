import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "../firebase/firebase";
import { Dispatch } from "../state/store";
import { TaskInfo } from "../types/task";
import { Task } from "./Task";

type TaskListProps = {
  taskList: TaskInfo[];
};

export const TaskList = (props: TaskListProps): JSX.Element => {
  const history = useHistory();
  const { taskList } = props;
  const dispatch = useDispatch<Dispatch>();

  const setTaskDetails = (event: React.MouseEvent<HTMLElement>) => {
    const {
      currentTarget: { id },
    } = event;
    dispatch.taskDetail.setTaskDetail({ taskId: id });
  };

  const onDelete = async (event: React.MouseEvent<HTMLElement>) => {
    const {
      currentTarget: { id },
    } = event;
    dispatch.taskDetail.setTaskDetail({ taskDeleteId: id });

    await firebase
      .firestore()
      .collection("tasks")
      .where("id", "==", id)
      .get()
      .then((item) => {
        item.docs[0].ref.delete();
        alert("OKEKE");
      })
      .catch((error) => {
        alert("Khong xao duwoc");
      });
    history.push("/dfd");
  };

  const result = taskList.map((item, index) => {
    return (
      <Task
        onDelete={onDelete}
        onClick={setTaskDetails}
        key={index}
        taskInfo={item}
      />
    );
  });
  return (
    <>
      <div className="list-group">{result}</div>
    </>
  );
};
