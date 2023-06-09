import Track from "@components/Track/Track";
import React from "react";
import Container from "./Container";
import Footer from "./Footer";
import LoadingTrack from "./Loading/LoadingTrack";

const Highlight = () => {
  return (
    <Container>
      {/* <LoadingTrack /> */}
      <Track
        title={"Lion We"}
        artist={"Rye"}
        tag={"Hip-Hop"}
        date={"2023-5-29 16:18:00"}
        likes={1}
        highlights={242}
        shares={1095}
        plays={276042}
        comments={496}
        isHighlight={true}
        self={"EXXSTACY"}
      />
      <Footer />
    </Container>
  );
};

export default Highlight;
