let users = loadUsersFromLocalStorage();

function saveUsersToLocalStorage(users) {
    localStorage.setItem('users', JSON.stringify(users)); // Convertimos el array a JSON
}

function loadUsersFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users')); 
    return users ? users : []; 
}

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert("Este correo electrónico ya está registrado.");
        } else {
            users.push({ email, password });
            saveUsersToLocalStorage(users); 
            alert("¡Registro exitoso!");
            console.log("Usuarios registrados:", users);
        }

        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirm-password').value = '';
    });
});
