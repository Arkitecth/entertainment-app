import { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const person = { ...form };
    const email = person.email;
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      const message = await response.json();
      if (!response.ok) {
        throw new Error(message.msg);
      } else {
        navigate("/home", { state: { email } });
      }
    } catch (e) {
      window.alert(e);
    }
  }
  return (
    <div className="login-container">
      <img src={logo} alt="logo" />
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Login</h1>
        <label htmlFor="email"></label>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Email Address"
          onChange={(e) => updateForm({ email: e.target.value })}
        />

        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => updateForm({ password: e.target.value })}
        />

        <label htmlFor="submit"></label>
        <button type="submit">Login to your account</button>

        <p>
          Don't have an account?{" "}
          <NavLink style={{ textDecoration: "none" }} to="/sign-up">
            {" "}
            <span className="sign-up">Sign Up</span>{" "}
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
