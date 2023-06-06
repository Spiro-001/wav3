const postUsernameValid = (username) => {
  fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      username: username.toLowerCase(),
    }),
  });
};

export default postUsernameValid;
