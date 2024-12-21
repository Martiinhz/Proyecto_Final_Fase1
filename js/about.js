let totalIncome = 0;  
let totalExpense = 0; 
let balance = 0;      
let oldBalance = 0;

const form = document.getElementById('finance-form');
const errorMessage = document.getElementById('error-message'); 
const updateBalance = () => {
    balance = totalIncome - totalExpense; 
    return balance; 
}

// solucionando error de carga de pagina

// aqui se cargan los datos del LS 
window.addEventListener('load', () => {
    // verificamos si hay data
    const savedFinance = JSON.parse(localStorage.getItem("userFinance"));
    
    if (savedFinance) {
        totalIncome = savedFinance.totalIncome;
        totalExpense = savedFinance.totalExpense;
        balance = savedFinance.balance;

        // se actualiza los datos en el DOM
        const totalIncomeElement = document.getElementById('total-income');
        const totalExpenseElement = document.getElementById('total-expense');
        const balanceElement = document.getElementById('balance');

        // los agregamos de manera visual
        totalIncomeElement.innerHTML = totalIncome.toFixed(2);
        totalExpenseElement.innerHTML = totalExpense.toFixed(2);
        balanceElement.innerHTML = balance.toFixed(2);
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();  

    const type = document.getElementById('type').value; 
    const amount = parseFloat(document.getElementById('amount').value);  
    const category = document.getElementById('category').value;  

    if (isNaN(amount) || amount <= 0 || category.trim() === "") {
        errorMessage.textContent = "Por favor, ingresa una cantidad válida y una categoría.";
        return;
    } else {
        errorMessage.textContent = "";  
    }

    const oldBalance = balance;

    if (type === "ingreso") {
        totalIncome += amount;
    } else if (type === "gasto") {
        totalExpense += amount; 
    }

    const newBalance = updateBalance();  

    // Guardar las transacciones
    const transaction = {
        type,
        amount,
        category,
        oldBalance,
        newBalance,
        date: new Date().toLocaleString()
    };

    // Obtener las transacciones previas del localStorage, si existen
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Aca actualizamos el resumen en el LS
    const userFinance = { totalIncome, totalExpense, balance: newBalance };
    localStorage.setItem("userFinance", JSON.stringify(userFinance));

    
    const totalIncomeElement = document.getElementById('total-income');
    const totalExpenseElement = document.getElementById('total-expense');
    const balanceElement = document.getElementById('balance');

    const getUserFinance = JSON.parse(localStorage.getItem("userFinance"));

    // si encuentra la key "userFinance", cambia o actualiza el resultado del dom
    if (getUserFinance) {
        totalIncomeElement.innerHTML = getUserFinance.totalIncome;
        totalExpenseElement.innerHTML = getUserFinance.totalExpense;
        balanceElement.innerHTML = getUserFinance.balance;
    }

    form.reset();
});

