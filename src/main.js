import { createApp } from 'vue';
import router from './routes.js'
import App from './App.vue';
import store from './store/index.js';
import ErrorMessage from './components/ErrorMessage.vue';
//import firebase from 'firebase';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJUoOi_yQ-eM8xEVRZ9jRWW3jc3HEg0bw",
  authDomain: "nwhwindows.firebaseapp.com",
  projectId: "nwhwindows",
  storageBucket: "nwhwindows.appspot.com",
  messagingSenderId: "1026115370050",
  appId: "1:1026115370050:web:d8e5327236b6246b7401db",
  measurementId: "G-4MGK9MWRTY"
};

// Initialize Firebase
const application = initializeApp(firebaseConfig);
const analytics = getAnalytics(application);
console.log(analytics);



const app = createApp(App);

app.component('error-message', ErrorMessage);
app.use(store);
app.use(router);

app.mount('#app');
