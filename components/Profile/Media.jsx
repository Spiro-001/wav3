import Post from "@components/Media/Post";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";

const Media = () => {
  const [views, setViews] = useState(0);
  useEffect(() => {
    fetch("api/demoviews/0xewqe12e12", {
      method: "POST",
    })
      .then(async (res) => {
        console.log(res);
        if (res.ok) return res.json();
        return await fetch("api/demoviews/0xewqe12e12")
          .then((res) => res.json())
          .then((views) => views);
      })
      .then((views) => setViews(views.total));
  }, []);
  return (
    <Container>
      <Post views={views} />
      <Footer />
    </Container>
  );
};

export default Media;
