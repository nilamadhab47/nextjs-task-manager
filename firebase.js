import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQ2zPvZKZED0jIUDokyFpdSyonS3tfrtw",
    authDomain: "task-manager-62474.firebaseapp.com",
    projectId: "task-manager-62474",
    storageBucket: "task-manager-62474.appspot.com",
    messagingSenderId: "961448406207",
    appId: "1:961448406207:web:604fcdbe5ea95eea116a0a",
    measurementId: "G-VWK09ZJSBX"
  };

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

// console.log(firebaseConfig)