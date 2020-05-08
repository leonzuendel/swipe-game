// Directus SDK Login
import DirectusSDK from "@directus/sdk-js";
const client = new DirectusSDK({
  url: "https://directus.leonzuendel.com/",
  project: "swipe-game",
  token: "9z2HOk12lw0gFdxctXlQMyuI"
});

export default client;
