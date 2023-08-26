import React, { useEffect, useState } from "react";
import "./AdDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { deleteAd, getAdById, likeAd } from "../../firebase";

function AdDetails() {
  const params = useParams();
  const [ad, setAd] = useState({});
  const navigate = useNavigate();

  const getAdData = () => {
    getAdById(params.id)
      .then((data) => {
        setAd(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAdData();
  }, []);

  const likeHandler = () => {
    likeAd(params.id, ad.likes + 1)
      .then(() => {
        getAdData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAdHandler = async () => {
    try {
      await deleteAd(params.id);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ad-details">
      {" "}
      <div className="ad-details-card">
        {" "}
        <h3>
          <i>{ad.title}</i>
        </h3>
        <p>
          <b>
            <i>{ad.company}</i>
          </b>
        </p>
        <p>{ad.description}</p>
        <p className="likes">Likes: {ad.likes}</p>{" "}
        {/* Promenjeno ime polja na 'likes' */}
        <button onClick={likeHandler}>Like</button>
        <button onClick={() => navigate(`/ad/${params.id}/edit`)}> Edit</button>
        <button onClick={() => deleteAdHandler()}>Delete</button>
      </div>
    </div>
  );
}

export default AdDetails;
