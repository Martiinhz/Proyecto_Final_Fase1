const loadSummary = localStorage.getItem('userFinance');
const userFinance = JSON.parse(loadSummary)

if (userFinance) {
    document.getElementById('total-income').innerHTML = userFinance.totalIncome
    document.getElementById('total-expense').innerHTML = userFinance.totalExpense
    document.getElementById('balance').innerHTML = userFinance.balance
} 

