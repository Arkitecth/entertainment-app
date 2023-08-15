import logo from "./assets/logo.svg"
import {useNavigate} from 'react-router-dom';

function Login() {
    const navigate = useNavigate(); 
    const handleSubmit = (event) => {
        event.preventDefault(); 
        navigate('/home');
    }
    return(
        <div className="login-container">
            <img src={logo} alt="logo" />
            <form onSubmit={handleSubmit} className="form-container">
                <h1>Login</h1>
                <label htmlFor="email"></label>
                <input type="text" name="email" id="email" placeholder="Email Address"/>

                <label htmlFor="password"></label>
                <input type="password" name="password" id="password" placeholder="Password"/>

                <label htmlFor="submit"></label>
               <button type="submit">Login to your account</button>
                <p>Don't have an account?   <span className="sign-up">Sign Up</span> </p> 
            </form>

        </div>

    )
}


export default Login