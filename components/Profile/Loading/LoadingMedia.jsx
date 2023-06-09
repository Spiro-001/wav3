import { Skeleton } from "@mui/material";
import React from "react";

const LoadingMedia = () => {
  return (
    <>
      <Skeleton
        varient="rectangular"
        width="100%"
        height={148}
        animation="wave"
      />
      <Skeleton
        varient="rectangular"
        width="100%"
        height={148}
        animation="wave"
      />
      <Skeleton
        varient="rectangular"
        width="100%"
        height={148}
        animation="wave"
      />
    </>
  );
};

export default LoadingMedia;
