import Album from "@components/Track/Album";
import React from "react";
import Container from "./Container";
import Footer from "./Footer";

const Albums = () => {
  const songs = [
    { title: "Come to me", order: 1, plays: 24420 },
    { title: "Break", order: 2, plays: 17542 },
    { title: "Let's pretend we're dead", order: 3, plays: 54268 },
  ];

  const plays = () => {
    let totalPlays = 0;
    songs.map((song) => {
      totalPlays += song.plays;
    });
    return totalPlays;
  };

  return (
    <Container>
      <Album
        title={"Hateful"}
        artist={"EXXSTACY"}
        tag={"Rock"}
        date={"2023-05-29 20:23:00"}
        likes={49272}
        highlights={9234}
        shares={7890}
        plays={plays()}
        comments={2214}
        isAlbum={true}
        songs={songs}
      />
      <Footer />
    </Container>
  );
};

export default Albums;
