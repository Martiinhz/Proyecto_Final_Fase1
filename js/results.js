const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

        // Obtener el tbody donde se agregarán las filas
        const tableBody = document.querySelector("#transactions-table tbody");

        // Si hay transacciones, agregarlas a la tabla
        if (transactions.length > 0) {
            transactions.forEach(transaction => {
                const row = document.createElement("tr");

                // Crear celdas para cada dato de la transacción
                const typeCell = document.createElement("td");
                typeCell.textContent = transaction.type === "ingreso" ? "Ingreso" : "Gasto";
                row.appendChild(typeCell);

                const amountCell = document.createElement("td");
                amountCell.textContent = transaction.amount.toFixed(2);
                row.appendChild(amountCell);

                const categoryCell = document.createElement("td");
                categoryCell.textContent = transaction.category;
                row.appendChild(categoryCell);

                const dateCell = document.createElement("td");
                dateCell.textContent = transaction.date;
                row.appendChild(dateCell);

                const oldBalanceCell = document.createElement("td");
                oldBalanceCell.textContent = transaction.oldBalance.toFixed(2);
                row.appendChild(oldBalanceCell);

                const newBalanceCell = document.createElement("td");
                newBalanceCell.textContent = transaction.newBalance.toFixed(2);
                row.appendChild(newBalanceCell);

                // Agregar la fila a la tabla
                tableBody.appendChild(row);
            });
        } else {
            // Si no hay transacciones, mostrar un mensaje
            const noTransactionsMessage = document.createElement("tr");
            const noTransactionsCell = document.createElement("td");
            noTransactionsCell.colSpan = 6;
            noTransactionsCell.textContent = "No hay transacciones registradas.";
            noTransactionsMessage.appendChild(noTransactionsCell);
            tableBody.appendChild(noTransactionsMessage);
        }