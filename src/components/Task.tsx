import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { TaskInfo } from "../types/task";
import "./general.css";

type TaskProps = {
  taskInfo: TaskInfo;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onDelete: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Task = (props: TaskProps): JSX.Element => {
  const {
    taskInfo: { id, name, status, description },
    onClick,
    onDelete,
  } = props;

  const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
      align-items: center;
      span{
        color:red;
        font-weight:bold;
      }
    }
  `;

  const CardActionsStyled = styled(CardActions)`
    .hehe: {
      margin-top: 0;
    }
  `;

  return (
    <Card style={{ marginBottom: "5px" }}>
      <CardActionArea>
        <CardContent
          style={{ padding: "0 10px", borderLeft: "10px solid green" }}
          id={id}
          onClick={onClick}
        >
          <HeaderStyled>
            <Typography
              style={{ padding: 0 }}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {name}
            </Typography>
            <span>{status}</span>
          </HeaderStyled>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <CardActionsStyled>
            <Button
              className="hehe"
              size="small"
              color="primary"
              style={{ border: "1px solid orange" }}
              onClick={onDelete}
            >
              Delete
            </Button>
          </CardActionsStyled>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
