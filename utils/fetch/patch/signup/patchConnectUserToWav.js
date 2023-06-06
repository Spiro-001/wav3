const patchConnectUserToWav = (searchParams, response) => {
  fetch(`/api/user/oauth/${searchParams}}`, {
    method: "PATCH",
    body: JSON.stringify({
      wav3: response._id,
    }),
  });
};

export default patchConnectUserToWav;
