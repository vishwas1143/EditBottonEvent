document.addEventListener('submit', addItem);

function addItem(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const obj = {
    name,
    email
  };
  var key = new Date().getTime();
  localStorage.setItem(key + 'user', JSON.stringify(obj));

  showUseronScreen(obj, key); // after storing data in local storage, run this function to show user details on the screen
}

function showUseronScreen(obj, key) {
  const parentElem = document.getElementById('users');

  parentElem.innerHTML += `<li>${obj.name} - ${obj.email}</li>`;
  let deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn';
  deleteBtn.appendChild(document.createTextNode('Delete'));
  parentElem.appendChild(deleteBtn);

  let editBtn = document.createElement('button');
  editBtn.className = 'btn';
  editBtn.appendChild(document.createTextNode('Edit'));
  parentElem.appendChild(editBtn);

  deleteBtn.addEventListener('click', () => deleteUser(key));
  editBtn.addEventListener('click', () => editUser(obj, key));
}

function deleteUser(key) {
  localStorage.removeItem(key + 'user');
  // Remove the corresponding list item from the screen
  const listItem = document.querySelector(`li[data-key="${key}"]`);
  listItem.remove();
}

function editUser(obj, key) {
  // Populate the form with the stored user data
  document.getElementById('name').value = obj.name;
  document.getElementById('email').value = obj.email;

  // Update the localStorage entry on form submit
  document.addEventListener('submit', (event) => {
    event.preventDefault();
    const updatedName = event.target.name.value;
    const updatedEmail = event.target.email.value;
    const updatedObj = {
      name: updatedName,
      email: updatedEmail
    };

    localStorage.setItem(key + 'user', JSON.stringify(updatedObj));

    // Update the corresponding list item on the screen
    const listItem = document.querySelector(`li[data-key="${key}"]`);
    listItem.textContent = `${updatedObj.name} - ${updatedObj.email}`;
  });
}
