// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app';

// Add the Firebase products that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase:
// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
	apiKey: 'AIzaSyDujfKt7ew0yVxs5hqleweyFY-Jpeh-wLo',
	authDomain: 'auth-practice-dba1b.firebaseapp.com',
	databaseURL: 'https://auth-practice-dba1b.firebaseio.com',
	projectId: 'auth-practice-dba1b',
	storageBucket: 'auth-practice-dba1b.appspot.com',
	messagingSenderId: '638651575629',
	appId: '1:638651575629:web:762d7297d4f34caf11db04',
};
// Initialize Firebase
const DBInit = firebase.initializeApp(firebaseConfig);

const GoogleProvider = new firebase.auth.GoogleAuthProvider();

const DBAuth = DBInit.auth();

export { DBAuth, GoogleProvider };
