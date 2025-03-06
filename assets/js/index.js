document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector(".register form");
    const loginForm = document.querySelector(".login form");

    // Register user
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = registerForm.querySelector("input[placeholder='Full Name']").value;
        const email = registerForm.querySelector("input[placeholder='Email']").value;
        const password = registerForm.querySelector("input[placeholder='Password']").value;

        try {
            const response = await fetch("http://localhost:8000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();

            if (response.ok) {
                alert("Registration successful! You can now log in.");
                registerForm.reset();
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });

    // Login user
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector("input[placeholder='Email']").value;
        const password = loginForm.querySelector("input[placeholder='Password']").value;

        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Login successful!");
                window.location.href = "dashboard.html"; // Redirect after login
            } else {
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });
});
