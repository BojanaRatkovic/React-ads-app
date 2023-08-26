import React, { useEffect, useState } from "react";
import "./EditAd.css";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getAdById, updateAdData } from "../../firebase";

const editAdSchema = yup.object({
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

const EditAd = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [ad, setAd] = useState({
    title: "",
    company: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const getAdData = () => {
    setIsLoading(true);
    getAdById(params.id)
      .then((data) => {
        setIsLoading(false);
        delete data.id;
        setAd(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getAdData();
  }, []);

  const submitForm = async (values) => {
    setIsLoading(true);
    try {
      await updateAdData(params.id, values);
      getAdData();
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="edit-ad-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="edit-ad-wrapper">
      <div>
        <h1>Edit Ad page</h1>
        <Formik
          enableReinitialize={true}
          initialValues={ad}
          validationSchema={editAdSchema}
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
    </div>
  );
};

export default EditAd;
