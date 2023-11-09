import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDACwaKy0zscceV2W6roaEmR73QMhjNjRI",
    authDomain: "olx-new-d9118.firebaseapp.com",
    projectId: "olx-new-d9118",
    storageBucket: "olx-new-d9118.appspot.com",
    messagingSenderId: "1009453402877",
    appId: "1:1009453402877:web:70cfbcdf07638b843d0c94",
    measurementId: "G-CG7F6CE1P8"
};

export default firebase.initializeApp(firebaseConfig);


