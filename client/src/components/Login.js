import React from 'react'
import {useState} from 'react'

function Login() {
    const [userData, setuserData] = useState({});
    
    const submit = (e) =>{
        e.preventDefault();
        fetch("/login", {
            method:"POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData),
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            if(data.token) {
                localStorage.setItem("auth_token", data.token);
                window.location.href = "/";
            } else {
                if (data.message) {
                    document.getElementById("error").innerHTML = data.message;
                }  else {
                    document.getElementById("error").innerHTML = "Very strange error!";
                }
            }
        })
    }
    const change = (e) =>{
        setuserData({...userData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h1>Login</h1>       
            <div className="container col s6">
                <div className="row">
                    <div id="error" className="card-panel indigo white-text"/>
                    <form onSubmit = {submit} onChange={change}>

                        <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" required/>
                        <label htmlFor="password">Password </label> 
                            <input type="password" name="password" id="password" required/>
                            <br/>
                        <input type="submit" className="btn" name="button" value="Login"/>
                    </form>
                </div>
            </div>
        </div> 
   )
}

export default Login
