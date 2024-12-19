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
   

    const date = new Date().toLocaleString();

    addToHistory(type, amount, category, oldBalance, newBalance, date);

    updateHistory();

    const userFinance = { totalIncome, totalExpense, balance: newBalance };
    localStorage.setItem("userFinance", JSON.stringify(userFinance));

    form.reset();
});
