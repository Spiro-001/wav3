import Album from "@components/Track/Album";
import React from "react";
import Container from "./Container";
import Footer from "./Footer";

const Playlist = () => {
  const songs = [
    { title: "Rainbow Connection", order: 1, plays: 1278962 },
    { title: "All Alone", order: 2, plays: 576823 },
    { title: "47'", order: 3, plays: 109256 },
  ];
  return (
    <Container>
      <Album
        title={"Wakeup music"}
        artist={"EXXSTACY"}
        date={"2023-05-29 20:23:00"}
        likes={3}
        highlights={1}
        shares={2}
        plays={47}
        comments={1}
        isAlbum={true}
        songs={songs}
      />
      <Footer />
    </Container>
  );
};

export default Playlist;
