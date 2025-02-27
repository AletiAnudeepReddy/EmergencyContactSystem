document.addEventListener("DOMContentLoaded", function () {
    const addContactBtn = document.getElementById("nav-add-contact");
    const contactsBtn = document.getElementById("nav-contacts");
    const updateContactBtn = document.getElementById("nav-update-contact");
    const aboutBtn = document.getElementById("nav-about");

    const mainContent = document.getElementById("main-content");

    addContactBtn.addEventListener("click", function (event) {
        event.preventDefault(); 
        mainContent.innerHTML = `
    <div class="add-contact-container">
        <div class="contact-form">
            <h2><i class="fas fa-user-plus"></i>Add Contact</h2>
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

    });

    contactsBtn.addEventListener("click", function (event) {
        event.preventDefault();
        mainContent.innerHTML = `<h2>All Contacts</h2><p>Contacts will be displayed here.</p>`;
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

});
