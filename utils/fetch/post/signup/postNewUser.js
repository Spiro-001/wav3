const postNewUser = async (
  props,
  username,
  email,
  year,
  month,
  day,
  password
) => {
  const newUser = await fetch("/api/user/new", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      email: props.link ? props.email : email,
      dateOfBirth: year + "-" + month + "-" + day,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
  return newUser;
};

export default postNewUser;
