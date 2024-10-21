import React from "react";
import "./intro.css";
export default function Intro() {
  return (
    <div className="intro-container">
      <h2 className="bc-pr-title">Blockchain Practical-6</h2>
      <div className="bc-pr-des">
        <u>Aim:</u> Prepare a smart contract between you and your professor and submit the practical performed by you. Your Professor should be able to check your identity.
      </div>
      <div className="bc-pr-des" style={{ marginTop: "1rem" }}>
        Note: Student have to login first then submit the actical.
      </div>
    </div>
  );
}
