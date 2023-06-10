export const deletePostById = async (id) => {
  const deletedPost = await fetch(`/api/post/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((post) => post);
  const deleteFBViews = await fetch(`/api/demoviews/${id}`, {
    method: "DELETE",
  });
  return deletedPost;
};
