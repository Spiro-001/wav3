import Track from "@components/Track/Track";
import React from "react";
import Container from "./Container";
import Footer from "./Footer";

const Tracks = () => {
  return (
    <Container>
      <Track
        title={"Come to me"}
        artist={"EXXSTACY"}
        tag={"Rock"}
        date={"2023-05-29 20:23:00"}
        likes={9272}
        highlights={242}
        shares={1095}
        plays={24420}
        comments={496}
      />
      <Track
        title={"Break"}
        artist={"EXXSTACY"}
        tag={"Rock"}
        date={"2023-05-29 20:23:00"}
        likes={5072}
        highlights={474}
        shares={986}
        plays={17542}
        comments={265}
      />
      <Track
        title={"Let's pretend we're dead"}
        artist={"EXXSTACY"}
        tag={"Rock"}
        date={"2023-05-29 20:23:00"}
        likes={12752}
        highlights={1562}
        shares={4071}
        plays={54268}
        comments={1056}
      />
      <Footer />
    </Container>
  );
};

export default Tracks;
