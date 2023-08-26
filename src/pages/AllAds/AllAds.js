import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./AllAds.css";
import AdCard from "../../components/AdCard/AdCard";
import { useNavigate } from "react-router-dom";
import Layout from "../../containers/Layout/Layout";
import { Grid } from "@mui/material";
import { getAds, auth } from "../../firebase";

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAds()
      .then((data) => {
        setAds(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        {ads.map((ad, index) => {
          return <AdCard key={index} ad={ad} />;
        })}
      </Grid>
    </Layout>
  );
};

export default AllAds;
