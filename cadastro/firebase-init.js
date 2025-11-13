
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBlkq_lxU5BbRw7yuza1_Cpfm2gRMEVIFM",
  authDomain: "customize-59ba1.firebaseapp.com",
  projectId: "customize-59ba1",
  storageBucket: "customize-59ba1.appspot.com", 
  messagingSenderId: "255055710649",
  appId: "1:255055710649:web:de94d07a9e2cac0059ce68"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
