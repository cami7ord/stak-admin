import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import * as firebase from 'firebase';
import '@firebase/firestore'

var config = {
	apiKey: "AIzaSyBC6e-Np6me7Y9ht-WUAKzc80-j4rqbzq0",
	authDomain: "stak-bee3e.firebaseapp.com",
	databaseURL: "https://stak-bee3e.firebaseio.com",
	projectId: "stak-bee3e",
	storageBucket: "stak-bee3e.appspot.com",
	messagingSenderId: "878013066458"
};
firebase.initializeApp(config);

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
registerServiceWorker();