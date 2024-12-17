const users = [
    {
        email: "soyespectador@gmail.com",
        password: "visitante123"
    },
];

document.addEventListener('DOMContentLoaded', () => {
    login();
});

const loadUsersFromLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    return users ? users : []; 
}

const login = () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const usuarioPorDefecto = users.find(
            usuario => usuario.email === email.value && usuario.password === password.value
        );

        if (usuarioPorDefecto) {
            alert("¡Bienvenido!");
            setTimeout(() => {
                window.location.href = '../about.html'; 
            }, 1000);
            return; 
        }

        const readUsersInLocalStorage = loadUsersFromLocalStorage();

        const usuarioEncontrado = readUsersInLocalStorage.find(
            usuario => usuario.email === email.value && usuario.password === password.value
        );

        if (usuarioEncontrado) {
            alert("¡Bienvenido!");
            setTimeout(() => {
                window.location.href = '../about.html'; 
            }, 1000);
        } else {
            errorMessage.textContent = "Correo o contraseña incorrectos.";
        }
    });
};



