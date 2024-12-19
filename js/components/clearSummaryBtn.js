const clearSummaryBtn = document.getElementById('clearSummaryBtn')

clearSummaryBtn.addEventListener('click', function() {
    localStorage.removeItem('userFinance')
    setTimeout(() => {
        location.reload()
    }, 300);
})