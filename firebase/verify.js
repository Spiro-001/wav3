import ms from "ms";
import { cookies } from "next/headers";

let seen = {};

setInterval(() => {
  seen = {};
}, ms("30s"));

const gip = require("request-ip");
const verify = (req) => {
  // const cookieStore = cookies();
  // const csrfToken = cookieStore.get("next-auth.csrf-token").value;
  // seen[csrfToken] = seen[csrfToken] ?? 0;
  // if (seen[csrfToken] > 0) {
  //   return new Response("Views exceeded for current IP.", { status: 429 });
  // }
  // seen[csrfToken]++;
  return new Response("Updated view count.", { status: 200 });
};

export default verify;
