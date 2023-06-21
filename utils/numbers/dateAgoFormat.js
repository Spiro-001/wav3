import moment from "moment";

export const formatDateAgo = (date) => {
  const dateNow = new Date();
  const songDate = new Date(date);

  const seconds = Math.floor(dateNow - songDate / 1000);
  let interval = seconds / 31536000;

  return moment(date, ["YYYYMMDDhhmmss"]).fromNow();
};

export const isNew = (date) => {
  const uploadDate = moment(date, ["YYYYMMDDHHmmss"]);
  const timeNow = moment(new Date());
  return timeNow.diff(uploadDate, "hours") < 23;
};

export const timeNow = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};
