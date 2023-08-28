import { useState } from "react";
import logo from "../assets/logo.svg"
import {useNavigate} from 'react-router-dom';
import { NavLink } from "react-router-dom";

function SignUp() {
    const [form, setForm] = useState({
        email: "", 
        password: ""
    }
    ); 

    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
      }
      
    const navigate = useNavigate(); 
    async function handleSubmit(event) {
        event.preventDefault(); 
        const person = { ...form};
        await fetch("http://localhost:3001/auth/register", {
            method: "POST", 
            headers: {
                'Content-Type': "application/json",
            }, 
            body: JSON.stringify(person),
        })
        .catch(error => {
            window.alert(error);
            return;
        })    
        navigate('/home');
    }
    return(
        <div className="login-container">
            <img src={logo} alt="logo" />
            <form onSubmit={handleSubmit} className="form-container">
                <h1>Sign Up</h1>
                <label htmlFor="email"></label>
                <input type="text" name="email" id="email" placeholder="Email Address" onChange={e => updateForm({email: e.target.value})}/>

                <label htmlFor="password"></label>
                <input type="password" name="password" id="password-1" placeholder="Password" onChange={e => updateForm({password: e.target.value})} />

                <label htmlFor="password"></label>
                <input type="password" name="password" id="password-2" placeholder="Repeat Password"/>

                <label htmlFor="submit"></label>
               <button type="submit">Create an account</button>
               <p>Already have an account? <NavLink style={{textDecoration:"none"}} to="/"> <span className="sign-up">Login</span> </NavLink> </p> 
            </form>

        </div>

    )
}

export default SignUp