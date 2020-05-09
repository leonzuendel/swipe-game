import firebase from "firebase";
import Cookies from "js-cookie";

export default (context) => {
  firebase.auth().addAuthTokenListener((idToken) => {
    // 3600 sec = 0.04166667 Days
    Cookies.set("__session", idToken, { expires: idToken ? 0.04166667 : 0 });
  });
};
