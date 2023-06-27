export const postNewPost = async (
  postOwnerId,
  doc,
  updatedAt,
  body,
  images,
  video,
  likes,
  comments,
  highlights
) => {
  const newPost = await fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({
      postOwnerId,
      doc,
      updatedAt,
      body,
      images,
      video,
      likes,
      comments,
      highlights,
    }),
  })
    .then((res) => res.json())
    .then((post) => post);
  return newPost;
};
