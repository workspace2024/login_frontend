import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

function Register() {
  const [loading, setloading] = useState(false);
  const register_validation_schema = yup.object().shape({
    FName: yup.string().required("first name is required"),
    LName: yup.string().required("last name is required"),
    Email: yup.string().email("Invalid Email").required("email is required"),
    Password: yup.string().required("Password is required"),
    reenter_password: yup
      .string()
      .oneOf([yup.ref("Password")], "password must match")
      .required("confirm password is required"),
  });
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik({
      initialValues: {
        FName: "",
        LName: "",
        Email: "",
        Password: "",
        reenter_password: "",
      },
      validationSchema: register_validation_schema,
      onSubmit: async (user_data) => {
        setloading(true);
        try {
          await axios.post(
            "http://localhost:8000/api/v1/users/adduser",
            user_data
          );
          toast.success("User Created Successfully");
          setloading(false);
        } catch (error) {
          setloading(false);
          toast.error(error.response.data.Error);
        }
      },
    });
  return (
    <div className="registration">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register page" />
      </Helmet>
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <div>
            <label className="fname">First Name</label>
            <input
              type="text"
              value={values.FName}
              onChange={handleChange}
              onBlur={handleBlur}
              name="FName"
              required
            />
          </div>

          <div>
            <label className="lname">Last Name</label>
            <input
              type="text"
              value={values.LName}
              name="LName"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label className="email">Email</label>
            <input
              type="email"
              value={values.Email}
              name="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>
          <label className="pass">Password</label>
          <input
            type="password"
            value={values.Password}
            name="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <label className="cpass">Confirm Password</label>
          <input
            type="Password"
            value={values.reenter_password}
            name="reenter_password"
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.reenter_password && touched.reenter_password && (
            <p className="required-msg">{errors.reenter_password}</p>
          )}
          <div className="button-parent">
          <button type="submit">Register</button>
          </div>
          <br />
        </div>
      </form>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
    </div>
  );
}

export default Register;
