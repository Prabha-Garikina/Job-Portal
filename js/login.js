document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login__form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    const userData = { email, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        window.location.href = "home.html"; // Redirect to dashboard/home page
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
