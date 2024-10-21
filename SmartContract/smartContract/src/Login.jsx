import axios from "axios";
import { useState } from "react";
import "./login.css";


export default function Login({ loginFun }) {
  const [email, setEmail] = useState("");
  let isLogin = false;
  const [password, setPassword] = useState("");
  const loginStudent = () => {
    axios
      .post("http://localhost:3000/api/users/userLogin", {
        email,
        password,
      })
      .then((response) => {
        // console.log(response);
        isLogin = true;
        loginFun(isLogin, response.data.role);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("enrollment", response.data.enrollment);
        console.log(response.data.data);
        console.log(response.data.role + "fomr login");
      });
  };
  return (
    <div>
      <div className="register-form-container">
        <div className="title">Login Form </div>


        <div className="details">
          <div className="details-field">
            <span>Email:</span>
            <input type="email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="details-field">
            <span>Password:</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="submit-button" onClick={loginStudent}>
          Login
        </button>
      </div>
    </div>
  );
}
