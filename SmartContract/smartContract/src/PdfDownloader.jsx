import React from "react";


function PDFDownloader({ base64String, fileName }) {
  const downloadPDF = () => {
    const base64Data = base64String.replace(
      /^data:application\/pdf;base64,/,
      ""
    );
    // Create a Blob from the base64 string
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });


    // Create a URL for the Blob and open it in a new tab
    const url = URL.createObjectURL(blob);
    window.open(url);
  };


  return (
    <div>
      <button onClick={downloadPDF} className="submit-button">
        View Practical
      </button>
    </div>
  );
}


export default PDFDownloader;
