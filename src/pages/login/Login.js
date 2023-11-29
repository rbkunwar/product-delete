import React, { useEffect, useRef } from "react";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";

import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/customInpute/CustomInput";

import { useNavigate } from "react-router-dom";
import { loginAdminAction } from "../user-redux/userAction";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { user } = useSelector((state) => state.admin);

  useEffect(() => {
    user?.uid && navigate("/dashboard");
  }, [user?.uid, navigate]);

  const handleOnLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      return alert("Must provide email and password both");
    }

    dispatch(loginAdminAction({ email, password }));
  };

  const userLoginInpute = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Sam@email.com",
      required: true,
      passRef: emailRef,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*******",
      required: true,
      passRef: passwordRef,
    },
  ];

  return (
    <div>
      <Header />

      <main
        className="login-main mt-5"
        style={{ width: "500px", margin: "auto" }}
      >
        <Form className="border p-5 rounded m-3 shadow-lg">
          <h2>Admin login only</h2>
          <hr />
          {userLoginInpute.map((item, i) => (
            <CustomInput key={i} {...item} />
          ))}

          <div className="d-grid mt-3">
            <Button variant="primary" onClick={handleOnLogin}>
              Login!
            </Button>
          </div>
        </Form>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
