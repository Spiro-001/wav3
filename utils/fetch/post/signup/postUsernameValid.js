const postUsernameValid = async (username = null, email = null) => {
  const foundUser = fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(
      username
        ? {
            username: username.toLowerCase(),
          }
        : { email: email.toLowerCase() }
    ),
  });
  return foundUser;
};

export default postUsernameValid;
