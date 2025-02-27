document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.querySelector(
      "input[placeholder='Enter your name']"
    ).value;
    const email = document.querySelector(
      "input[placeholder='Enter your email']"
    ).value;
    const password = document.querySelector(
      "input[placeholder='Create password']"
    ).value;
    const confirmPassword = document.querySelector(
      "input[placeholder='Confirm password']"
    ).value;
    const termsAccepted = document.querySelector(
      "input[type='checkbox']"
    ).checked;

    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { name, email, password };

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Signup successful! You can now log in.");
        window.location.href = "index.html"; // Redirect to login page
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
