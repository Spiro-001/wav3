import { deleteSPhotoFromS3 } from "@aws/s3_aws";

export const deletePostById = async (id) => {
  const deletedPost = await fetch(`/api/post/${id}`, { method: "DELETE" })
    .then((res) => res.json())
    .then((post) => post);
  const deleteFBViews = await fetch(`/api/demoviews/${id}`, {
    method: "DELETE",
  });
  const deleteS3Object = await deleteSPhotoFromS3(deletedPost.images[0]);
  return deletedPost;
};
