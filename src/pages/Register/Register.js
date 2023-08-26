import React from "react";
import "./Register.css";
import { Formik } from "formik";
import * as yup from "yup";
import { signUpAd } from "../../firebase";
import { useNavigate } from "react-router-dom";

const registerSchema = yup.object({
  fullName: yup
    .string()
    .required("Ime i prezime su obavezno polje, unesite ih"),
  email: yup
    .string()
    .required("Email je obavezno polje, unesite email")
    .email("Email format nije dobar"),
  password: yup
    .string()
    .required("Sifra je obavezno polje, unesite sifru")
    .min(6, "Sifra mora da ima najmanje 6 karaktera")
    .max(50, "Sifra mora da ima najvise 50 karaktera"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Sifre se ne poklapaju"),
});

const Register = () => {
  const navigate = useNavigate();
  const submitForm = async (values) => {
    await signUpAd(values.email, values.password, values.fullName);
    navigate("/");
  };

  return (
    <div className="register-wrapper">
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values) => {
          submitForm(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <div>
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Ime i prezime"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
              />
              <p className="error-message">
                {errors.fullName && touched.fullName && errors.fullName}
              </p>
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <p className="error-message">
                {errors.email && touched.email && errors.email}
              </p>
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Sifra"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <p className="error-message">
                {errors.password && touched.password && errors.password}
              </p>
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Potvrdi sifru"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              <p className="error-message">
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </p>
            </div>
            <button onClick={handleSubmit} type="button">
              Submit
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Register;
