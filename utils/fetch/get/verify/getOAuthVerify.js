const getOAuthVerify = (router, session) => {
  fetch(`/api/user/oauth/${session.user.id}`)
    .then((res) => res.json())
    .then((oAuthUser) => {
      if (oAuthUser) {
        setLoadProfile(oAuthUser);
        router.push(
          `/verify?has_wav3_link=false&account_info=${oAuthUser._id}&provider=${oAuthUser.provider}`
        );
      } else router.push("/feed");
    });
};

export default getOAuthVerify;
