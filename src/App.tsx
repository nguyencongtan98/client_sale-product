import { Button, Grid, useScrollTrigger } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import { CartList } from "./components/CartList/CartList";
import { MenuSideBar } from "./components/MenuSideBar";
import { ProductList } from "./components/ProductList/ProductList";
import { TaskDetail } from "./components/TaskDetail";
import { TaskList } from "./components/TaskList";
import firebase from "./firebase/firebase";
import { Dispatch, RootState } from "./state/store";
import { getData, postData } from "./api";
import { CartInfo, ProductInfo, TaskInfo } from "./types/task";
import { Login } from "./components/Login/Login";
import { env } from "process";

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

  // const dataTmp: TaskInfo[] = [
  //   {
  //     id: "1",
  //     status: 1,
  //     name: "Create save filter",
  //     description: "323",
  //     createDate: "2021-01-02",
  //     dueDate: "2021-01-03",
  //   },
  //   {
  //     id: "2",
  //     status: 2,
  //     name: "Create test script search filter edit",
  //     description: "323",
  //     createDate: "2021-01-02",
  //     dueDate: "2021-01-03",
  //   },
  //   {
  //     id: "3",
  //     status: 3,
  //     name: "Update component filter target edit",
  //     description: "323",
  //     createDate: "2021-01-02",
  //     dueDate: "2021-01-03",
  //   },
  //   {
  //     id: "4",
  //     status: 4,
  //     name: "Create document study spec",
  //     description: "Ta",
  //     createDate: "2021-01-02",
  //     dueDate: "2021-01-03",
  //   },
  //   {
  //     id: "5",
  //     status: 4,
  //     name: "Create document study spec",
  //     description: "Ta",
  //     createDate: "2021-01-02",
  //     dueDate: "2021-01-03",
  //   },
  //   {
  //     id: "6",
  //     status: 4,
  //     name: "Create document study spec",
  //     description: "Ta",
  //     createDate: "2021-01-02",
  //     dueDate: "2021-01-03",
  //   },
  //   {
  //     id: "7",
  //     status: 4,
  //     name: "Create document study spec",
  //     description: "Ta",
  //     createDate: "2021-01-02",
  //     dueDate: "2021-01-03",
  //   },
  //   {
  //     id: "8",
  //     status: 4,
  //     name: "Create document study spec",
  //     description: "Ta",
  //     createDate: "2021-01-02",
  //     dueDate: "2021-01-03",
  //   },
  //   {
  //     id: "9",
  //     status: 4,
  //     name: "Create document study spec",
  //     description: "Ta",
  //     createDate: "2021-01-02",
  //     dueDate: "2021-01-03",
  //   },
  // ];

  // const deleteTodo = () => {
  //   firebase
  //     .firestore()
  //     .collection("tasks")
  //     .where("id", "==", "1")
  //     .get()
  //     .then((item) => {
  //       item.docs[0].ref.delete();
  //     });
  //   firebase.database().ref("messages");
  // };

  // const addToto = () => {
  //   dataTmp.forEach((item) => {
  //     const { createDate, description, dueDate, id, name, status } = item;
  //     firebase.firestore().collection("tasks").add({
  //       id,
  //       status,
  //       name,
  //       description,
  //       createDate,
  //       dueDate,
  //       closingDate: "",
  //     });
  //   });
  // };

  // const dataTmp = [
  //   { value: "doing", label: "Doing" },
  //   { value: "done", label: "Done" },
  //   { value: "closed", label: "Close" },
  //   { value: "open", label: "open" },
  // ];

  // const addToto = () => {
  //   dataTmp.forEach((item) => {
  //     const { label, value } = item;
  //     firebase.firestore().collection("status").add({
  //       value,
  //       label,
  //     });
  //   });
  // };

  const [taskList2, setTaskList2] = useState<TaskInfo[]>([]);
  // const taskList = useSelector((state: RootState) => state.task);

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
  }, [dispatch, taskList2, deleteId]);

  console.log("3232: ", process.env.REACT_APP_SERVER_PORT);

  useEffect(() => {
    getData(`${process.env.REACT_APP_SERVER_PORT2}/product`).then((result) => {
      dispatch.product.fetchProductList(result as ProductInfo[]);
    });
  }, [dispatch.product]);

  const session = JSON.parse(sessionStorage.getItem("userName") as string);

  console.log("session: ", session);

  let idLogin = "";
  if (session) {
    const { userId = "" } = session;
    idLogin = userId;
  }

  console.log("userId", idLogin);

  useEffect(() => {
    if (idLogin) {
      postData(`${process.env.REACT_APP_SERVER_PORT}/cart`, { idLogin }).then(
        (result) => {
          dispatch.cart.fetchCartList(result);
        }
      );
    }
  }, [dispatch.cart, idLogin]);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <>
            <Grid
              item
              style={{
                position: "fixed",
                width: "100%",
                overflow: "auto",
                top: 0,
                zIndex: 1,
              }}
            >
              <MenuSideBar />
            </Grid>
            <Grid item style={{ margin: "0 auto", marginTop: "80px" }} sm={10}>
              <ProductList />
            </Grid>
          </>
        </Route>
        <Route path="/cart-list">
          <MenuSideBar />
          <Grid item style={{ margin: "0 auto", marginTop: "80px" }} sm={10}>
            <CartList />
          </Grid>
        </Route>
        <Route path="/login">
          <MenuSideBar />
          <Grid item style={{ margin: "0 auto", marginTop: "80px" }} sm={4}>
            <Login />
          </Grid>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
