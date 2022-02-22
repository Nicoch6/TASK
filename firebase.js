
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
  import {
    getFirestore,
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
  } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

   import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase/auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAql0N6caCQDajRUwwNurN4oGEAdiuQLgo",
    authDomain: "tareas-50632.firebaseapp.com",
    projectId: "tareas-50632",
    storageBucket: "tareas-50632.appspot.com",
    messagingSenderId: "295498475495",
    appId: "1:295498475495:web:ff9ec25a31b82602237f42",
    measurementId: "G-X9CN42W6JB"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const saveTask = (title, description) =>
 addDoc(collection(db, "tasks"), { title, description });

export const getTasks = () => getDocs(collection(db, "tasks"));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);



export const crearUsuario = createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
