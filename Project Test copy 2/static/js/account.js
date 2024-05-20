// account.js
document.addEventListener("DOMContentLoaded", () => {
  const errorMessage = document.getElementById("errorMessage");
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");
  console.log("account.js is being executed...");

  if (error) {
    // Display error message based on error code
    if (error === "InvalidUsername") {
      errorMessage.innerText = "Invalid Username. Please try again.";
      console.log("Error:", error);
    } else if (error === "InvalidPassword") {
      errorMessage.innerText = "Invalid Password. Please try again.";
    }
  }
});
