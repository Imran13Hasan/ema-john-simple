import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';

export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
}

//The condition when users signed in
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const userSignedIn = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true,
            }
            return userSignedIn
        })
        .catch(err => {
            console.log(err.message)
        })
};


export const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
   return firebase.auth().signInWithPopup(fbProvider)
        .then( (res)=> {
            const { displayName, email, photoURL } = res.user;
            const userFbSignedIn = {
                isSignedIn: true,
                fb_name: displayName,
                fb_email: email,
                fb_photo: photoURL, 
                success: true,
            }
            return userFbSignedIn;

        }).catch( (error)=> {
           console.log(error.message)
        });
};


//Condition of when user signed out
export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: "",
                email: "",
                photo: "",
                error: "",
                success: false,
            }
            return signedOutUser;
        })
        .catch(err => {
            console.log(err.message)
        })
};

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = "";
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })
        .catch(error => {
            // Handle Errors here.
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = "";
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            // Handle Errors here.
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}


const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    }).then(() => {
        // Update successful.
        console.log("Updated user name successfully")
    }).catch((error) => {
        // An error happened.
        console.log(error)
    });
}