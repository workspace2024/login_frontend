import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

function Login() {
  const [loading, setloading] = useState(false);
  const register_validation_schema = yup.object().shape({
    Email: yup.string().email("Invalid Email").required("Email is Required"),
    Password: yup.string().required("Password is Required"),
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        Email: "",
        Password: "",
      },
      validationSchema: register_validation_schema,
      onSubmit: async (user_data) => {
        setloading(true);
        try {
          const login = await axios.post(
            "http://localhost:8000/api/v1/users/login",
            user_data,
            {
              withCredentials: true,
            }
          );
          toast.success("Login Successful");
          console.log(login);
          setloading(false);
        } catch (error) {
          setloading(false);
          console.log(error);
          toast.error(error.response.data.Error);
        }
      },
    });
  return (
    <div className="login">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Helmet>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label className="uname">Email</label>
          <input
            type="text"
            value={values.Email}
            name="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <label className="psw">Password</label>
          <input
            type="password"
            value={values.Password}
            name="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <div className="button-parent">
            <button type="submit">Login</button>
          </div>
        </div>
        <div class="container">
          <div className="create">
            Don't have an Account yet? &nbsp;
            <Link to="/register">create one!</Link>
          </div>
        </div>
      </form>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </div>
  );
}

export default Login;
