import firebaseDB from "@firebase/firebase";
import verify from "@firebase/verify";

export const POST = async (req, { params }) => {
  try {
    const verifyStatus = verify(req);
    if (verifyStatus.ok) {
      const ref = firebaseDB.ref("views").child("post").child(params.slug);
      const { snapshot } = await ref.transaction((currentViews) => {
        if (currentViews === null) {
          return 1;
        }
        return currentViews + 1;
      });
      return new Response(JSON.stringify({ total: snapshot.val() }), {
        status: 200,
      });
    }
    return new Response(verifyStatus.statusText, {
      status: verifyStatus.status,
    });
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req, { params }) => {
  try {
    const snapshot = await firebaseDB
      .ref("views")
      .child("post")
      .child(params.slug)
      .once("value");
    const views = snapshot.val();
    return new Response(JSON.stringify({ total: views }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const deletePost = firebaseDB
      .ref("views")
      .child("post")
      .child(params.slug)
      .remove();
    return new Response(`fb views for ${params.slug} has been deleted.`, {
      status: 202,
    });
  } catch (error) {
    console.log(error);
  }
};
