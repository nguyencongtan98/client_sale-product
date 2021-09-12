import { yupResolver } from "@hookform/resolvers/yup";
import { Button, FormControl, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as yup from "yup";
import firebase from "../firebase/firebase";
import { RootState } from "../state/store";
import { Status, TaskInfo } from "../types/task";
import { dateToString } from "../utils/getData";

const schema = yup.object().shape({
  name: yup.string().required("Vui long nhap truong nay"),
  description: yup.string().required("Vui long nhap truong nay"),
  status: yup.string().required("Vui long nhap truong nay"),
  createDate: yup.string().required("Vui long nhap truong nay"),
  closingDate: yup.string().required("Vui long nhap truong nay"),
  dueDate: yup.string().required("Vui long nhap truong nay"),
});

const generateId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const TaskDetail = (): JSX.Element => {
  const onSubmit = (data: TaskInfo) => {

    // const { status, name, description, createDate, dueDate, closingDate } =
    //   data;

    // firebase.firestore().collection("tasks").add({
    //   id: generateId(),
    //   status,
    //   name,
    //   description,
    //   createDate,
    //   dueDate,
    //   closingDate,
    // });
  };

  const [statusList, setStatusList] = useState<Status[]>([]);

  useEffect(() => {
    let tmp: Status[] = [];
    firebase
      .firestore()
      .collection("status")
      .get()
      .then((item) => {
        item.docs.forEach((st) => {
          tmp.push(st.data() as unknown as Status);
        });
      });
    setStatusList(tmp);
  }, []);

  const taskList = useSelector((state: RootState) => state.task);
  const taskId = useSelector(
    (state: RootState) => state.taskDetail.taskId
  ) as string;
  const [task, setTask] = useState<TaskInfo>(taskList[0]);


  useEffect(() => {
    if (taskList && taskId) {
      const tmp = taskList.find((item) => item.id === taskId) || taskList[0];
      setTask(tmp);
    }
  }, [taskList]);

  const { register, handleSubmit } = useForm<TaskInfo>({
    resolver: yupResolver(schema),
  });

  const FormGroupStyled = styled(FormControl)`
    width: 100%;
  `;

  const ButtonGroupStyled = styled.div`
    display: flex;
    justify-content: space-between;
    button {
      width: 23%;
    }
  `;
  const FormContainerStyled = styled.div`
    height: 100%;
    padding: 10px;
    box-shadow: 0px 0px 10px #232931;
  `;

  const currentDate = dateToString(new Date());

  const changeStatusTask = (event: React.MouseEvent<HTMLElement>) => {
    const {
      currentTarget: { id },
    } = event;
    firebase
      .firestore()
      .collection("tasks")
      .where("id", "==", taskId)
      .get()
      .then((item) => {
        item.docs[0].ref.update({
          status: id,
        });
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;

  };

  useEffect(() => {
    axios.get("https://my-posts-tannc.herokuapp.com/posts/tan").then((item) => {
      // axios.get("http://localhost:5000/posts/tan").then((item) => {
    });
  }, []);

  return (
    <FormContainerStyled>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroupStyled>
          {/* <TextField
            margin="dense"
            defaultValue="0"
            hidden
            {...register("id")}
          /> */}

          <TextField
            margin="dense"
            // error
            // helperText="required"
            id="taskName"
            label="Task Name"
            variant="filled"
            multiline
            onChange={handleChange}
          />

          <TextField
            margin="dense"
            id="taskDesciption"
            label="Task Desciption"
            multiline
            rows={7}
            variant="filled"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="taskStatus"
            label="Task Status"
            variant="filled"
            select
            defaultValue={task.status}
            // disabled={!taskId ? true : false}
            SelectProps={{ native: true }}
            {...register("status")}
          >
            {statusList.map((item) => (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="createDate"
            label="Create date"
            type="date"
            variant="filled"
            defaultValue={currentDate}
            {...register("createDate")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="closedDate"
            label="Closed date"
            type="date"
            variant="filled"
            defaultValue={currentDate}
            {...register("closingDate")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            id="dueDate"
            label="Due date"
            type="date"
            variant="filled"
            defaultValue={currentDate}
            {...register("dueDate")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {taskId ? (
            <ButtonGroupStyled>
              <Button
                id="open"
                onClick={changeStatusTask}
                variant="contained"
                color="default"
              >
                Open
              </Button>
              <Button
                id="doing"
                onClick={changeStatusTask}
                variant="contained"
                color="inherit"
              >
                Doing
              </Button>
              <Button
                id="closed"
                onClick={changeStatusTask}
                variant="contained"
                color="secondary"
              >
                Done
              </Button>
              <Button
                id="cancel"
                onClick={changeStatusTask}
                variant="contained"
                color="primary"
                type="submit"
              >
                Cancel
              </Button>
            </ButtonGroupStyled>
          ) : (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="secondary"
            >
              Submit
            </Button>
          )}
        </FormGroupStyled>
      </form>
    </FormContainerStyled>
  );
};
