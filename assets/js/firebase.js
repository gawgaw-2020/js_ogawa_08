const firebaseConfig = {
  apiKey: "AIzaSyAPhk4bSvwDr9VZaIBzVn7OTNee483V4W0",
  authDomain: "student-management-fa084.firebaseapp.com",
  databaseURL: "https://student-management-fa084.firebaseio.com",
  projectId: "student-management-fa084",
  storageBucket: "student-management-fa084.appspot.com",
  messagingSenderId: "900033397149",
  appId: "1:900033397149:web:c5a16bd3ad7c00dafa2f74"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firestoreを使えるようにする、変数にする
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const staffcollection = db.collection('staff');
const studentscollection = db.collection('students');

// -------------firebase関連ここまで-------------

//ストレージの定義
const storage = localStorage;
