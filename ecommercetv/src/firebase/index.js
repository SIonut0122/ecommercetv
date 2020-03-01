 import * as firebase from 'firebase/app';
 import 'firebase/database';
 import 'firebase/auth';
  const apikey = `${process.env.REACT_APP_API_KEY}`



  var firebaseConfig = {
    apiKey: apikey,
    authDomain: "ecommtvlap.firebaseapp.com",
    databaseURL: "https://ecommtvlap.firebaseio.com",
    projectId: "ecommtvlap",
    storageBucket: "ecommtvlap.appspot.com",
    messagingSenderId: "446048701906",
    appId: "1:446048701906:web:427a786d0b69f27e21cc0b"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

      
 
  