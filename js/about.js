let totalIncome = 0;  
let totalExpense = 0; 
let balance = 0;      
let oldBalance = 0;

const form = document.getElementById('finance-form');
const errorMessage = document.getElementById('error-message'); 
const updateBalance = () => {
    balance = totalIncome - totalExpense; 
    console.log("Balance actualizado:", balance);
    return balance; 
}

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

    // Agregar la nueva transacción al array
    transactions.push(transaction);

    // Guardar las transacciones actualizadas en localStorage
    localStorage.setItem("transactions", JSON.stringify(transactions));

    // Actualizar el resumen en el localStorage
    const userFinance = { totalIncome, totalExpense, balance: newBalance };
    localStorage.setItem("userFinance", JSON.stringify(userFinance));

    // Actualizar la UI del resumen
    const totalIncomeElement = document.getElementById('total-income');
    const totalExpenseElement = document.getElementById('total-expense');
    const balanceElement = document.getElementById('balance');

    const getUserFinance = JSON.parse(localStorage.getItem("userFinance"));

    if (getUserFinance) {
        totalIncomeElement.innerHTML = getUserFinance.totalIncome;
        totalExpenseElement.innerHTML = getUserFinance.totalExpense;
        balanceElement.innerHTML = getUserFinance.balance;
    }

    form.reset();
});

