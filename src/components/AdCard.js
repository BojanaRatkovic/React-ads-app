import React from "react";
import "./AdCard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adSlice } from "../../store/adSlice";
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const AdCard = (props) => {
  const ad = props.ad;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const goToDetails = () => {
    navigate("/ad/" + ad.id);
  };

  const addToFavorites = () => {
    dispatch(adSlice.actions.setFavorite(ad));
  };

  const reportAd = () => {
    const reportMessage = prompt("Unesite poruku za prijavu");
    const reportObject = {
      ad: ad,
      reportMessage: reportMessage,
      user: {
        fullName: authState.fullName,
        id: authState.id,
      },
    };
    dispatch(adSlice.actions.setReport(reportObject));
  };

  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined" sx={{ my: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {ad.company}
          </Typography>
          <Typography variant="h5" component="div">
            {ad.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {ad.description}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color="error" />
          </IconButton>
          <Button size="small" onClick={() => goToDetails()}>
            Detaljnije
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AdCard;
