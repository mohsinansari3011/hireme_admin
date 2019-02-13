import React, { Component } from 'react';
import { firebase , firedb } from '../../firebase'

class Login extends Component {


    state = {
        
    }




    render() {
        return (
            <div>
                <h1> Login / Register Panel </h1>
                <label> Email :</label>
               <input type="text" placeholder="enter email" /> <br/>
                <label> Password :</label>
                <input type="text" placeholder="enter password"/> <br/>

                <button>Register</button>
               <button>Login</button>
            </div>
        );
    }
}

export default Login;