document.addEventListener("DOMContentLoaded", function () {
    const addContactBtn = document.getElementById("nav-add-contact");
    const contactsBtn = document.getElementById("nav-contacts");
    const updateContactBtn = document.getElementById("nav-update-contact");
    const aboutBtn = document.getElementById("nav-about");
    const deleteBtn=document.getElementById("nav-delete-contact");

    const mainContent = document.getElementById("main-content");

    // ✅ Retrieve user details from localStorage
    const userName = localStorage.getItem("userName") || "User";
    const userEmail = localStorage.getItem("userEmail") || "user@example.com";
    const userPhone = localStorage.getItem("userPhone") || "Not provided";

    // ✅ Display user name in the header
    const userNameElement = document.getElementById("user-name");
    if (userNameElement) {
        userNameElement.textContent = `Welcome, ${userName}`;
    }

    // ✅ "Profile" Button Event Listener
    const profileBtn = document.getElementById("nav-profile");
    if (profileBtn) {
        profileBtn.addEventListener("click", function () {
            mainContent.innerHTML = `
                <div class="profile-card">
                    <i class="fa-solid fa-user-circle"></i>
                    <h2>${userName}</h2>
                    <p><strong>Email:</strong> ${userEmail}</p>
                    <p><strong>Phone:</strong> ${userPhone}</p>
                </div>
            `;
        });
    }
    document.getElementById("sign-out").addEventListener("click", function () {
        window.location.href = "main.html"; // Redirect to main page on sign-out
    });

    if (addContactBtn) {
        addContactBtn.addEventListener("click", function (event) {
            event.preventDefault(); 
            
            mainContent.innerHTML = `
                <div class="add-contact-container">
                    <div class="contact-form">
                        <h2><i class="fas fa-user-plus"></i> Add Contact</h2>
                        <form id="add-contact-form">
                            <label for="name">Name:</label>
                            <input type="text" id="name" required>
    
                            <label for="mobile">Mobile No.:</label>
                            <input type="text" id="mobile" required>
    
                            <label for="priority">Priority:</label>
                            <input type="number" id="priority" min="1" max="5" required>
    
                            <label for="category">Category:</label>
                            <select id="category">
                                <option value="family">Family</option>
                                <option value="friend">Friend</option>
                                <option value="others">Others</option>
                            </select>
    
                            <button type="submit">Save Contact</button>
                        </form>
                    </div>
                </div>
            `;
    
            // Now the form exists in the DOM, so we can add the event listener
            document.getElementById("add-contact-form").addEventListener("submit", async function (e) {
                e.preventDefault();
    
                const name = document.getElementById("name").value;
                const phone = document.getElementById("mobile").value;
                const priority = document.getElementById("priority").value;
                const category = document.getElementById("category").value;
    
                try {
                    const response = await fetch("/api/contacts/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                        body: JSON.stringify({ name, phone, priority, category })
                    });
    
                    const data = await response.json();
                    if (response.ok) {
                        alert("Contact added successfully!");
                        loadContacts();
                    } else {
                        alert("Error: " + data.message);
                    }
                } catch (error) {
                    console.error("Error adding contact:", error);
                    alert("Something went wrong!");
                }
            });
        });
    }
    // Define callContact globally
function callContact(phoneNumber) {
    alert("Calling " + phoneNumber);
}

contactsBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const contacts = [
        { name: "John Doe", phone: "+1 234 567 890", priority: "High" },
        { name: "Alice Smith", phone: "+1 987 654 321", priority: "Medium" },
        { name: "Michael Johnson", phone: "+1 555 666 777", priority: "Low" },
        { name: "John Doe", phone: "+1 234 567 890", priority: "High" },
        { name: "Alice Smith", phone: "+1 987 654 321", priority: "Medium" },
        { name: "Michael Johnson", phone: "+1 555 666 777", priority: "Low" },
        { name: "John Doe", phone: "+1 234 567 890", priority: "High" },
        { name: "Alice Smith", phone: "+1 987 654 321", priority: "Medium" },
        { name: "Michael Johnson", phone: "+1 555 666 777", priority: "Low" },
        { name: "John Doe", phone: "+1 234 567 890", priority: "High" },
        { name: "Alice Smith", phone: "+1 987 654 321", priority: "Medium" },
        { name: "Michael Johnson", phone: "+1 555 666 777", priority: "Low" }
    ];

    let contactsHTML = `
        <h2 class="keerthy"><i class="fas fa-address-book"></i> All Contacts</h2>
        <div class="contacts-grid">               
    `;

    contacts.forEach(contact => {
        contactsHTML += `
            <div class="contact-card">
                <h3><i class="fa-solid fa-user"></i> ${contact.name}</h3>
                <p><i class="fa-solid fa-phone"></i> ${contact.phone}</p>
                <p><i class="fa-solid fa-star"></i> Priority: ${contact.priority}</p>
                <button class="call-btn" data-phone="${contact.phone}">
                    <i class="fa-solid fa-phone-volume"></i> Call
                </button>
            </div>
        `;
    });

    contactsHTML += `</div>`;
    mainContent.innerHTML = contactsHTML;

    // Add event listeners to dynamically added call buttons
    document.querySelectorAll(".call-btn").forEach(button => {
        button.addEventListener("click", function () {
            const phoneNumber = this.getAttribute("data-phone");
            callContact(phoneNumber);
        });
    });

    // Animate contacts appearing one by one
    setTimeout(() => {
        document.querySelectorAll(".contact-card").forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("show");
            }, index * 200); // Delay each contact by 200ms
        });
    }, 100);
});



    

    updateContactBtn.addEventListener("click", function (event) {
        event.preventDefault(); 
        mainContent.innerHTML = `
        <div class="add-contact-container">
            <div class="contact-form">
                <h2><i class="fas fa-edit"></i> Update Contact</h2>
                <form id="update-contact-form">
                    <label for="old-name">Old Name:</label>
                    <input type="text" id="old-name" required>

                    <label for="new-name">New Name:</label>
                    <input type="text" id="new-name" required>

                    <label for="mobile">Mobile No.:</label>
                    <input type="text" id="mobile" required>

                    <label for="priority">Priority:</label>
                    <input type="number" id="priority" min="1" max="5" required>

                    <label for="category">Category:</label>
                    <select id="category">
                        <option value="family">Family</option>
                        <option value="friend">Friend</option>
                        <option value="others">Others</option>
                    </select>

                    <button type="submit">Update Contact</button>
                </form>
            </div>
        </div>
        `;
    });

    aboutBtn.addEventListener("click", function (event) {
        event.preventDefault();
        mainContent.innerHTML = `
            <div class="about-container">
                <div class="about-content">
                    <h2>About Emergency Contact System</h2>
                    <p>
                        The <strong>Emergency Contact System</strong> is designed to help users manage and access emergency contacts efficiently.
                        Using data structures like Binary Search Trees (BST), Linked Lists, and Priority Queues, it ensures quick access
                        to high-priority contacts in urgent situations.
                    </p>
                    <p>
                        Our system allows users to <strong>add, update, delete, and search</strong> for contacts seamlessly.
                        It also supports <strong>prioritization, event scheduling</strong>, and graphical visualization of event statistics.
                    </p>
                    <div class="features">
                        <h3>Key Features:</h3>
                        <ul>
                            <li>🚀 Quick Access to Emergency Contacts</li>
                            <li>📂 Categorization: Family, Friends, Others</li>
                            <li>🔍 Search & Prioritize Important Contacts</li>
                            <li>📊 Event Management with Graph Visualizations</li>
                            <li>📅 Scheduling & Reminders</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });
    deleteBtn.addEventListener("click", function (event) {
        event.preventDefault();
    
        // Show the input field and delete button
        mainContent.innerHTML = `
            <h2 class="allcontacts"><i class="fas fa-user-minus"></i> Delete Contact</h2>
            <div class="delete-form">
                <input type="text" id="delete-name" placeholder="Enter Contact Name">
                <button id="confirm-delete">Delete</button>
            </div>
        `;
    
        // Event listener for delete action
        document.getElementById("confirm-delete").addEventListener("click", function () {
            const nameToDelete = document.getElementById("delete-name").value.trim();
    
            if (nameToDelete === "") {
                alert("Please enter a contact name.");
                return;
            }
    
            alert(`Contact "${nameToDelete}" will be deleted (backend implementation needed).`);
        });
    });
    // Event Listener for Search Button
document.getElementById("nav-search-contact").addEventListener("click", function (event) {
    event.preventDefault();
    showSearchForm();
});

// Function to show search form
function showSearchForm() {
    let searchHTML = `
        <div class="search-form">
            <input type="text" id="searchInput" placeholder="Enter contact name">
            <button id="searchNow"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
        </div>
        <div id="searchResults"></div>
    `;
    mainContent.innerHTML = searchHTML;

    // Add Event Listener to the search button after it's added to the DOM
    document.getElementById("searchNow").addEventListener("click", searchContact);
}

// Function to search contacts
function searchContact() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchInput));
    
    let resultHTML = `<h3>Search Results:</h3>`;
    if (filteredContacts.length > 0) {
        filteredContacts.forEach(contact => {
            resultHTML += `
                <div class="contact-card">
                    <h3><i class="fa-solid fa-user"></i> ${contact.name}</h3>
                    <p><i class="fa-solid fa-phone"></i> ${contact.phone}</p>
                    <p><i class="fa-solid fa-star"></i> Priority: ${contact.priority}</p>
                </div>
            `;
        });
    } else {
        resultHTML += `<p class="no-result">No contact found.</p>`;
    }
    
    document.getElementById("searchResults").innerHTML = resultHTML;
}

});




