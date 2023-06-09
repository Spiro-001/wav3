import { Skeleton } from "@mui/material";
import React from "react";

const LoadingTrack = () => {
  return (
    <>
      <Skeleton
        varient="rectangular"
        width="100%"
        height={148}
        animation="wave"
      />
    </>
  );
};

export default LoadingTrack;
