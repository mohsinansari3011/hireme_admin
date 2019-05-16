import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import Routes from './routes'
import { BrowserRouter} from 'react-router-dom'
import { firebase, firedb, firebaselooper } from './firebase';






const App = (props) =>{

    return ( <BrowserRouter>
        <Routes {...props}/>
            </BrowserRouter>)
}

firebase
    .database()
    .ref('users')
    .orderByChild('email')
    .equalTo('mohsinansari3011@gmail.com')
    .once('value', snap => {

        snap.forEach((childSnapshot) => {
              console.log(childSnapshot.val().email);
          });
       


    });

firebase.auth().onAuthStateChanged((user) => {
    // console.log(firebase.auth().uid);

    // firedb.ref('users/' + firebase.auth().currentUser.uid ).once('value')
    //   .then((snapshot) =>{
    //       console.log(snapshot.data);
    //       snapshot.forEach((childSnapshot) => {
    //           console.log(childSnapshot.val());
    //       });
      
         
    //   })


      ReactDOM.render(<App user={user} />, document.getElementById('root'));
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
