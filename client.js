// Directus SDK Login
import DirectusSDK from "@directus/sdk-js";
const client = new DirectusSDK({
  url: "https://directus.leonzuendel.com/",
  project: "leonzuendel",
  token: "eqHIiu2UNCiWFMnu1NXxpMHK"
});

export default client;
