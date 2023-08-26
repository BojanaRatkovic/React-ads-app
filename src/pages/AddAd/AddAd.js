import React, { useState } from "react";
import "./AddAd.css";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { addAd } from "../../firebase";
import Layout from "../../containers/Layout/Layout";
import { useSelector } from "react-redux";

const newAdSchema = yup.object({
  title: yup
    .string()
    .required("Naslov je obavezno polje")
    .min(6, "Naslov mora da ima najmanje 6 karaktera")
    .max(100, "Naslov mora da ima najviše 100 karaktera"),
  company: yup
    .string()
    .required("Kompanija je obavezno polje")
    .min(4, "Kompanija mora da ima najmanje 4 karaktera")
    .max(50, "Kompanija mora da ima najviše 50 karaktera"),
  description: yup
    .string()
    .required("Opis je obavezno polje")
    .min(10, "Opis mora da ima najmanje 10 karaktera")
    .max(200, "Opis mora da ima najviše 200 karaktera"),
});

const AddAd = () => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  console.log(authState, "authState");

  const submitForm = async (values) => {
    try {
      await addAd({ ...values, userId: authState.id });
      alert("Uspešno dodat oglas");
    } catch (err) {
      console.log(err);
    }
  };

  if (!authState.id) {
    return <Navigate to={"/login"} replace={true} />;
  }

  return (
    <Layout>
      <div className="add-ad-wrapper">
        <Formik
          initialValues={{
            title: "",
            company: "",
            description: "",
            likes: 0,
          }}
          validationSchema={newAdSchema}
          onSubmit={(values, actions) => {
            submitForm(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div>
              <div>
                <p>Title</p>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <p className="error-message">
                  {errors.title && touched.title && errors.title}
                </p>
              </div>
              <div>
                <p>Company</p>
                <input
                  type="text"
                  name="company"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.company}
                />
                <p className="error-message">
                  {errors.company && touched.company && errors.company}
                </p>
              </div>
              <div>
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <p className="error-message">
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </p>
              </div>

              <button onClick={handleSubmit} type="button">
                Submit
              </button>
            </div>
          )}
        </Formik>
      </div>
    </Layout>
  );
};

export default AddAd;
