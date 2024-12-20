const clearSummaryBtn = document.getElementById('clearHistoryBtn')

clearSummaryBtn.addEventListener('click', function() {
    localStorage.removeItem('transactions')
    setTimeout(() => {
        location.reload()
    }, 200);
})