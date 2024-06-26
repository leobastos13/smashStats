import { useState, useEffect } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup  } from 'firebase/auth'
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth"
import { auth, googleProvider } from '../services/firebaseConfig'

const Login = () => {

    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signInWithEmailAndPassword, user, error] = useSignInWithEmailAndPassword(auth);

    const HandleEmailInput = (event) => {
        setEmail(event.target.value);
    }

    const HandlePasswordInput = (event) => {
        setPassword(event.target.value);
    }

    const HandleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            signInWithEmailAndPassword(email, password); 
        } catch (error) {
            console.error(error);
            
        }
        setLoading(false);

        if (error) {
            alert('The credetials are not valid. Please try again!');
        }
    }

    useEffect(()=>{
        if (user) {
        navigate('/home');   
    } });

    const signInWithGoogle = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider); 
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <div style={{backgroundColor: '#1d4050', padding: '32px'}}>
        <div className="container d-flex align-items-center justify-content-center flex-column mt-5 mb-5">
            <div style={{paddingLeft: '570px', position: 'relative', top: '25px'}} className="header d-flex align-items-center flex-column mb-4 text-white">
                <h1>Welcome!</h1>
                <h3>Log in into your account!</h3>
                <img style={{paddingRight: '1360px', position: 'relative', top: '-103px'}} src="assets/icons/logo-removebg-preview.png"></img>
            </div>
            <form style={{paddingLeft: '570px', marginTop: '-65px'}} className="d-flex align-items-center flex-column">
                <div>
                    <label className="fw-400 fs-4 mb-2 text-white" htmlFor="email">Email</label>
                    <input
                        className="d-flex flex-row align-items-start p-2 w-100 h-100 rounded-3 mb-3"
                        style={{border: 'solid 2px', borderColor: '#63ed85'}}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="jake@example.com"
                        onChange={HandleEmailInput}
                    ></input>
                </div>
                <div>
                    <label className="fw-400 fs-4 mb-2 text-white" htmlFor="password">Password</label>
                    <input
                        className="d-flex flex-row align-items-start p-2 w-100 h-100 rounded-3 mb-3"
                        style={{border: 'solid 2px', borderColor: '#63ed85'}}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="**************"
                        onChange={HandlePasswordInput}
                    ></input>
                </div>
                <button style={{backgroundColor: '#63ed85'}} className="w-100 h-100 border-0 rounded-3 text-light d-flex justify-content-center align-items-center gap-2 fs-5" onClick={(event) => {HandleLogin(event)}}>
                    Log in
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                    </svg>
                    <Link to= "/home"></Link>
                </button>
                <Link style={{cursor: 'default', color: '#63ed85' }} className="fw-400 text-decoration-underline" to="#">Forgot your password?</Link>
                <div className="mt-5">
                    <button style={{borderColor: '##63ed85', marginTop: '-25px'}} className='bg-white rounded-3 d-flex flex-row justify-content-center align-items-center' onClick={(event) => {signInWithGoogle(event)}}>
                        <div className="text-secondary fs-6 fw-400 letter-spacing-md">Continue with Google</div>
                    </button>
                </div> 
                <p className="mt-3 mb-0 text-white">Don't have an account?</p>
                <Link style={{color: '#63ed85'}} className="fw-400 fs-6 text-decoration-underline " to="/register">Sign Up here!</Link>
            </form>
        </div>
        </div>

    )
}
export default Login;