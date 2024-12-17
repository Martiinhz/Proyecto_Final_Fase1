let totalIncome = 0;
let totalExpense = 0;

const form = document.getElementById('finance-form');
const totalIncomeElement = document.getElementById('total-income');
const totalExpenseElement = document.getElementById('total-expense');
const balanceElement = document.getElementById('balance');
const errorMessageElement = document.getElementById('error-message');

function updateBalance() {
    const balance = totalIncome - totalExpense;
    balanceElement.textContent = balance;
    return balance; 
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (isNaN(amount) || amount <= 0 || category.trim() === "") {
        errorMessageElement.textContent = "Por favor, ingresa una cantidad válida y una categoría.";
        return;
    } else {
        errorMessageElement.textContent = ""; 
    }

    const oldBalance = updateBalance();  

    if (type === "ingreso") {
        totalIncome += amount;
    } else if (type === "gasto") {
        totalExpense += amount;
    }

    const newBalance = updateBalance();  

    const date = new Date().toLocaleString();

    addToHistory(type, amount, category, oldBalance, newBalance, date);

    updateHistory();

    totalIncomeElement.textContent = totalIncome.toFixed(2);
    totalExpenseElement.textContent = totalExpense.toFixed(2);

    form.reset();
});
