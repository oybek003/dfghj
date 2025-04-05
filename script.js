const API_URL = "https://67ee9307c11d5ff4bf7a2063.mockapi.io/api/oybekmsl";

function fetchContacts() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("contactList");
      list.innerHTML = "";
      data.forEach(contact => {
        const contactDiv = document.createElement("div");
        contactDiv.className = "contact";
        contactDiv.id = `contact-${contact.id}`;
        
        contactDiv.innerHTML = `
          <div class="contact-info">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar">
            <div class="info">
              <div><strong>${contact.name}</strong></div>
              <div style="color: gray">${contact.age}</div>
            </div>
          </div>
          <div class="icons" id="icons-${contact.id}">
            <span class="edit" onclick="editContact(${contact.id}, '${contact.name}', '${contact.age}')">✏️</span>
            <span class="delete" onclick="deleteContact(${contact.id})">🗑️</span>
          </div>
        `;
        list.appendChild(contactDiv);
      });
    });
}

function addContact() {
  const name = document.getElementById("nameInput").value.trim();
  const number = document.getElementById("numberInput").value.trim();
  if (!name || !number) return alert("Fill in both fields");

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, age: number })
  })
  .then(() => {
    document.getElementById("nameInput").value = "";
    document.getElementById("numberInput").value = "";
    fetchContacts();
  });
}

function deleteContact(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  }).then(() => fetchContacts());
}

function editContact(id, oldName, oldNumber) {
  const contactDiv = document.getElementById(`contact-${id}`);
  contactDiv.innerHTML = `
    <div class="contact-info">
      <img src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar">
      <div class="info">
        <input type="text" id="edit-name-${id}" value="${oldName}">
        <input type="text" id="edit-number-${id}" value="${oldNumber}">
      </div>
    </div>
    <div class="icons">
      <button onclick="saveContact(${id})">Save</button>
    </div>
  `;
}

function saveContact(id) {
  const newName = document.getElementById(`edit-name-${id}`).value.trim();
  const newNumber = document.getElementById(`edit-number-${id}`).value.trim();

  if (!newName || !newNumber) return alert("Fields cannot be empty!");

  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName, age: newNumber })
  })
  .then(() => fetchContacts());
}

fetchContacts();