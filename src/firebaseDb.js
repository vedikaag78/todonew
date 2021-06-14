






import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDyFoqGbyWpoElncv0RSC9A4sXUHaEcC_o",
authDomain: "vue-todo-8c8e5.firebaseapp.com",
projectId: "vue-todo-8c8e5",
storageBucket: "vue-todo-8c8e5.appspot.com",
messagingSenderId: "361068568058",
appId: "1:361068568058:web:7712bc0992facd11db9843",
measurementId: "G-808Y3Q7WTR"

    
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();



