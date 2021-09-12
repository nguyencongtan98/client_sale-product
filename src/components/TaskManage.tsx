import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Flex } from "rebass";
import { Dispatch, RootState } from "../state/store";
import { TaskInfo } from "../types/task";
import { TaskDetail } from "./TaskDetail";
import { TaskList } from "./TaskList";
import firebase from "../firebase/firebase";

export const TaskManage = (): JSX.Element => {
  const dispatch = useDispatch<Dispatch>();
  const taskList = useSelector((state: RootState) => state.task);

  const [taskInfoList, setTaskInfoList] = useState<TaskInfo[]>([]);
  useEffect(() => {
    const apiUrl = "http://localhost:8080/task";
    fetch(apiUrl)
      .then((result) => result.json())
      .then((rs) => {
        setTaskInfoList(rs as TaskInfo[]);
      });
  }, []);

  const [taskList2, setTaskList2] = useState<TaskInfo[]>([]);

  useEffect(() => {
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
  }, [taskList2]);

  useEffect(() => {
    if (taskList2) {
      dispatch.task.fetchTaskList(taskList2);
    }
  }, [dispatch, taskList2]);

  return (
    <Box>
      <Box aria-label="Task header">
        <Box as="h1">Manage My task</Box>
        <Flex>
          {/* <Box width={1 / 6} ><TaskDetail /></Box> */}
          <Box width={3 / 6}>
            <TaskList taskList={taskList2} />
          </Box>
          <Box width={2 / 6}>
            <TaskDetail />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
