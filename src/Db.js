import firebase from 'firebase';
import 'firebase/firestore'
require('dotenv').config()



const firebaseConfig = {
    apiKey:process.env.VUE_APP_apiKey ,
    authDomain: process.env.VUE_APP_authDomain   ,
    projectId: process.env.VUE_APP_projectId    ,
    storageBucket: process.env.VUE_APP_storageBucket,
    messagingSenderId:process.env.VUE_APP_messagingSenderId ,
    appId: process.env.VUE_APP_appId  ,
    measurementId:process.env.VUE_APP_measurementId ,


};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db
const messaging = firebase.messaging()
Notification.requestPermission()
.then(function(){
    console.log('Have permission');
    
  return messaging.getToken()
}).then(token => {
    console.log(token);
})


