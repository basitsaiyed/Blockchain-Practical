import React, { useEffect, useState } from "react";
import SubmissionForm from "../../src/Components/SubmissionForm/SubmissionForm";
import Intro from "../../src/Components/Intro/Intro.jsx";
import Login from "../../src/Components/Auth/Login/Login";
import CheckPractial from "../../src/Components/CheckPractical/CheckPractial";
import "./home.css";


export default function Home() {
  const [page, setPage] = useState("");
  const [role, setRole] = useState("");
  const [isLogin, setLogin] = useState(false);
  const pageName = (name) => {
    if (page == name) {
      setPage("");
    } else {
      setPage(name);
    }
  };


  const loginFun = (value, role) => {
    setLogin(value);
    setRole(role);
    console.log(role);
    setPage("");
  };
  return (
    <>
      <div className="home-container">
        <div className="title"> Submission Portal </div>
        <div className="auth-links">
          <div onClick={() => pageName("login")}>Login</div>
        </div>
      </div>
      {page == "login" ? <Login loginFun={loginFun} /> : <Intro />}
      {isLogin && role != "professor" ? <SubmissionForm /> : null}
      {isLogin && role == "professor" ? <CheckPractial /> : null}
    </>
  );
}
