let history = [];

// Función para agregar una transacción al historial
function addToHistory(type, amount, category, oldBalance, newBalance, date) {
    history.push({
        type: type,
        amount: amount,
        category: category,
        oldBalance: oldBalance,
        newBalance: newBalance,
        date: date
    });
}

// Función para mostrar el historial
function updateHistory() {
    const historyElement = document.getElementById('history');  // Elemento donde se mostrará el historial
    historyElement.innerHTML = "<h3>Historial de Transacciones</h3>";

    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Balance Anterior</th>
            <th>Balance Nuevo</th>
        </tr>
    `;

    history.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
            <td>${transaction.amount.toFixed(2)}</td>
            <td>${transaction.oldBalance.toFixed(2)}</td>
            <td>${transaction.newBalance.toFixed(2)}</td>
        `;
        table.appendChild(row);
    });

    historyElement.appendChild(table);
}
