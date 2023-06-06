const patchConnectUserToWav = async (searchParams, response) => {
  const connectedWavAccount = await fetch(`/api/user/oauth/${searchParams}}`, {
    method: "PATCH",
    body: JSON.stringify({
      wav3: response._id,
    }),
  });
  return connectedWavAccount;
};

export default patchConnectUserToWav;
