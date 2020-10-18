import React, { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

const buttonStyle = {
    border: "transparent",
    margin: "10px",
    padding: "7px 33px",
    color: "white",
    backgroundColor: "orange",
    borderRadius: "20px",
    fontSize: "15px",
    fontFamily: "inherit",
    textTransform: "uppercase",
    fontWeight: 600,
    cursor: "pointer"
}

function Login() {
    //Default value of user when isn't signed in
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
    });

    initializeLoginFramework()

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
            })
    }

    const fbSignIn = () =>{
        handleFacebookSignIn()
        .then(res =>{
            handleResponse(res, true)
        })
    }
    
    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false)
            })
    }

    const handleSubmit = (event) => {
        console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res =>{
                handleResponse(res, true)
            })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
            .then(res =>{
                handleResponse(res, true)
            })
        }
        event.preventDefault()
    }

    const handleResponse = (res, redirect)=>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }

    const handleBlur = (event) => {
        let isFieldValid = true;
        // console.log(event.target.name, event.target.value)
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
        }
        if (event.target.name === 'password') {
            isFieldValid = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(event.target.value)
        }else{
            console.log("Password is not valid")
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }


    return (
        <div style={{ textAlign: "center" }}>
            <h1>Hello this is Authentication page!!!</h1>
            {
                user.isSignedIn ? <button onClick={signOut} style={buttonStyle}> Sign Out </button> : <button onClick={googleSignIn} style={buttonStyle}> Sign In </button>
            }

            {
                user.isSignedIn && <div>
                    <h3>Welcome, {user.name}</h3>
                    <p>Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
            <br />
            <button onClick={fbSignIn}>Sign In using Facebook</button>
            {
                <div>
                    <p>Facebook: {user.fb_name}</p>
                    <p>Facebook: {user.fb_email}</p>
                    <img src={user.fb_photo} alt="" />
                </div>
            }


            {/* Sign Up form */}
            <form className="form" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                <label htmlFor="newUser">New User</label>
                <br />
                {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p> */}
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter your name" id="" />}
                <br />
                <input type="email" name="email" onBlur={handleBlur} placeholder="Enter your email" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required />
                <br />
                <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>Done, user {newUser ? "created" : "Logged In"} successfully.</p>}
        </div>
    );
}

export default Login;
