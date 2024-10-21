import axios from "axios";
import React, { useState } from "react";


export default function SubmissionForm() {
  const [base64String, setBase64String] = useState("");


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target.result;
        setBase64String(base64);
        console.log(base64);
      };
      reader.readAsDataURL(selectedFile);
    }
  };


  const submitPractical = () => {
    axios
      .post("http://localhost:8080/addDataToChain", {
        data: {
          name: localStorage.getItem("name"),
          enrollment: localStorage.getItem("enrollment"),
          practical: base64String,
        },
      })
      .then((responce) => {
        alert(responce.data.message);
        console.log(responce.data.myChain);
      });
  };
  return (
    <div className="register-form-container">
      <div className="details">
        <div className="title">Submit Your Practicals:</div>
        <div>
          <div>Name:</div>
          <input type="text" value={localStorage.getItem("name")} />
        </div>
        <div>
          <div>Enrollment:</div>
          <div>
            <input type="text" value={localStorage.getItem("enrollment")} />
          </div>
        </div>
        <input type="file" onChange={(e) => handleFileChange(e)} />
      </div>
      <button onClick={submitPractical} className="submit-button">
        Submit
      </button>
    </div>
  );
}
