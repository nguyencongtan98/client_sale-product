import React, { useState } from "react";
import { Button, FormGroup, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postData } from "../../api";
import { useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../state/store";

interface DataLogin {
  userName: string;
  password: string;
  check: boolean;
}

const schema = yup.object().shape({
  userName: yup.string().required(),
  password: yup.string().required(),
});

export const Login = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataLogin>({
    resolver: yupResolver(schema),
  });

  const [messageLogin, setMessageLogin] = useState("");

  const onSubmit = (data: DataLogin) => {
    postData(`${process.env.REACT_APP_SERVER_PORT}/login`, data).then((result) => {
      if (result[0]) {
        const { name, id } = result[0];
        sessionStorage.setItem(
          "userName",
          JSON.stringify({ userId: id, userName: name })
        );
        history.push("/product");
      } else {
        setMessageLogin("User name or password incorrec");
      }
    });
  };

  const errorUserName = errors.userName?.message;
  const errorPasswrod = errors.password?.message;

  const responseFacebook = async (response: any) => {
    const { id: facebookId, name, picture } = response;

    await postData(`${process.env.REACT_APP_SERVER_PORT}/login/getUserId`, {
      userId: facebookId,
    }).then(async (result) => {
      if (result.length > 0) {
        const { id: userId } = result[0];
        sessionStorage.setItem(
          "userName",
          JSON.stringify({
            userId: userId,
            userName: facebookId,
            image: picture.data.url,
          })
        );
        history.push("/product");
      } else {
        await postData(`${process.env.REACT_APP_SERVER_PORT}/login/register`, {
          userName: facebookId,
        });

        postData(`${process.env.REACT_APP_SERVER_PORT}/login/getUserId`, {
          userId: facebookId,
        }).then((result) => {
          if (result.length > 0) {
            const { id } = result[0];
            sessionStorage.setItem(
              "userName",
              JSON.stringify({
                userId: id,
                userName: name,
                image: picture.data.url,
              })
            );
            history.push("/product");
          }
        });
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <FormGroup>
          <TextField
            error={errorUserName ? true : false}
            id="standard-basic"
            label="User Name"
            {...register("userName")}
            helperText={errorUserName}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            error={errorPasswrod ? true : false}
            id="standard-basic"
            label="Password"
            {...register("password")}
            helperText={errorPasswrod}
          />
        </FormGroup>
        <p style={{ color: "red" }}>{messageLogin}</p>
        <FormGroup style={{ marginTop: "10px" }}>
          <Button type="submit" style={{ background: "orange" }}>
            LOGIN
          </Button>
        </FormGroup>
        <br />
        <h1>LOGIN FACEBOOK</h1>
        <FacebookLogin
          appId="886076215620945"
          fields="name,picture"
          callback={responseFacebook}
        />
      </form>
    </>
  );
};
