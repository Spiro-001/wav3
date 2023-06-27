export const getPostByUserId = async (user, spot) => {
  const posts = await fetch(
    `http://localhost:3000/api/post/user/${user.id}?amount=${process.env.LOAD_POST_AMOUNT}&spot=${spot}`
  )
    .then((res) => {
      return res.json();
    })
    .then((posts) => posts);
  return posts;
};
