import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../services/AuthContext";

const Register = () => {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Must be 6 characters or more").required("Required"),
    }),
    onSubmit: (values) => {
      register(values.email, values.password);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && <div>{formik.errors.email}</div>}

      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.errors.password && <div>{formik.errors.password}</div>}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

