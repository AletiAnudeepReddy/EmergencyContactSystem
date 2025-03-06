document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector(".register form");
    const loginForm = document.querySelector(".login form");

    // ✅ Register user
    if (registerForm) {
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
                console.log("Register Response:", data); // Debugging

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
    }

    // ✅ Login user
    if (loginForm) {
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
                console.log("Login Response:", data); // Debugging

                if (response.ok && data.token) {
                    // ✅ Store token for authentication
                    localStorage.setItem("authToken", data.token);
                
                    // ✅ Store user details in localStorage
                    if (data.user) {
                        localStorage.setItem("userName", data.user.name || "User");
                        localStorage.setItem("userEmail", data.user.email || "user@example.com");
                        localStorage.setItem("userPhone", data.user.phone || "Not provided");
                    }
                
                    alert("Login successful!");
                    
                    console.log("Redirecting to index.html...");
                
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 100);               
                } else {
                    alert(data.message || "Login failed");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Something went wrong. Please try again.");
            }
        });
    }
});
