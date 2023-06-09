export const deletePostById = async (id) => {
  const deletedPost = await fetch(`/api/post/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((deletedPost) => deletedPost);
  return deletedPost;
};