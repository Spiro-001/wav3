import Track from "@components/Track/Track";
import React from "react";
import Container from "./Container";
import Footer from "./Footer";

const FtTrack = () => {
  return (
    <Container>
      <Track
        title={"Come to me"}
        artist={"EXXSTACY"}
        tag={"Alternative-Rock"}
        date={"2023-5-29 16:18:00"}
        likes={1}
        highlights={242}
        shares={1095}
        plays={276042}
        comments={496}
      />
      <Track
        title={"Come to me"}
        artist={"EXXSTACY"}
        tag={"Alternative-Rock"}
        date={"2023-5-29 16:18:00"}
        likes={1}
        highlights={242}
        shares={1095}
        plays={276042}
        comments={496}
      />
      <Footer />
    </Container>
  );
};

export default FtTrack;
