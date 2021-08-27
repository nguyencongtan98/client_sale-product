import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { TaskDetail } from "./components/TaskDetail";
import { TaskList } from "./components/TaskList";
import { TaskManage } from "./components/TaskManage";
import "./task.css";
import firebase from "./firebase/firebase";
import { TaskInfo } from "./types/task";
import { Grid } from "@material-ui/core";
import { MenuSideBar } from "./components/Menu";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "./state/store";
import { Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";

type TimeLine = {
  title: string;
  check: boolean;
};

function App() {
  // const [taskInfoList, setTaskInfoList] = useState<TaskInfo[]>([]);
  // useEffect(() => {
  //   const apiUrl = "http://localhost:8080/task";

  //   fetch(apiUrl)
  //     .then((result) => result.json())
  //     .then((rs) => {
  //       setTaskInfoList(rs as TaskInfo[]);
  //     });
  // }, []);

  const dataTmp: TaskInfo[] = [
    {
      id: "1",
      status: 1,
      name: "Create save filter",
      description: "323",
      createDate: "2021-01-02",
      dueDate: "2021-01-03",
    },
    {
      id: "2",
      status: 2,
      name: "Create test script search filter edit",
      description: "323",
      createDate: "2021-01-02",
      dueDate: "2021-01-03",
    },
    {
      id: "3",
      status: 3,
      name: "Update component filter target edit",
      description: "323",
      createDate: "2021-01-02",
      dueDate: "2021-01-03",
    },
    {
      id: "4",
      status: 4,
      name: "Create document study spec",
      description: "Ta",
      createDate: "2021-01-02",
      dueDate: "2021-01-03",
    },
    {
      id: "5",
      status: 4,
      name: "Create document study spec",
      description: "Ta",
      createDate: "2021-01-02",
      dueDate: "2021-01-03",
    },
    {
      id: "6",
      status: 4,
      name: "Create document study spec",
      description: "Ta",
      createDate: "2021-01-02",
      dueDate: "2021-01-03",
    },
    {
      id: "7",
      status: 4,
      name: "Create document study spec",
      description: "Ta",
      createDate: "2021-01-02",
      dueDate: "2021-01-03",
    },
    {
      id: "8",
      status: 4,
      name: "Create document study spec",
      description: "Ta",
      createDate: "2021-01-02",
      dueDate: "2021-01-03",
    },
    {
      id: "9",
      status: 4,
      name: "Create document study spec",
      description: "Ta",
      createDate: "2021-01-02",
      dueDate: "2021-01-03",
    },
  ];

  const deleteTodo = () => {
    firebase
      .firestore()
      .collection("tasks")
      .where("id", "==", "1")
      .get()
      .then((item) => {
        item.docs[0].ref.delete();
      });
    firebase.database().ref("messages");
  };

  const addToto = () => {
    dataTmp.forEach((item) => {
      const { createDate, description, dueDate, id, name, status } = item;
      firebase.firestore().collection("tasks").add({
        id,
        status,
        name,
        description,
        createDate,
        dueDate,
        closingDate: "",
      });
    });
  };

  const [taskList2, setTaskList2] = useState<TaskInfo[]>([]);
  const taskList = useSelector((state: RootState) => state.task);

  const taskDeleteId = useSelector(
    (state: RootState) => state.taskDetail.taskId
  ) as string;

  const [deleteId, setDeleteId] = useState("");

  useEffect(() => {
    setDeleteId(taskDeleteId);
    let tmp: TaskInfo[] = [];
    firebase
      .firestore()
      .collection("tasks")
      .get()
      .then((item) => {
        // const hehe = item.docs as unknown as TaskInfo[];
        item.docs.forEach((task) => {
          tmp.push(task.data() as unknown as TaskInfo);
        });
        setTaskList2(tmp);
      });
  }, [deleteId, taskDeleteId]);

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (taskList2) {
      dispatch.task.fetchTaskList(taskList2);
    }
  }, [dispatch, taskList2, deleteId, taskDeleteId]);

  const setTaskDetailAddTask = () => {
    dispatch.taskDetail.setTaskDetail({ taskId: "" });
  };

  return (
    // <Box className="App">
    //   <TaskList taskList={taskInfoList} />
    // </Box>
    <Router>
      <Switch>
        <Route path="/">
          {/* <button onClick={addToto}>ADD TODO</button> */}
          {/* <button onClick={deleteTodo}>Delete TODO</button> */}
          <Grid container>
            <Grid item sm={3} xs={12}>
              <MenuSideBar />
            </Grid>
            <Grid item sm={5} xs={12}>
              <TaskList taskList={taskList2} />
              <Button
                type="text"
                icon={<PlusSquareOutlined />}
                className="add-room"
                onClick={setTaskDetailAddTask}
              >
                Add task
              </Button>
            </Grid>
            <Grid item sm={4} xs={12}>
              <TaskDetail />
            </Grid>
          </Grid>
          {/* <TaskManage /> */}
        </Route>
        <Route path="/task">
          <TaskList taskList={taskList2} />
        </Route>
        <Route path="/task-detail/:taskId">
          <TaskDetail />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;