document.addEventListener('DOMContentLoaded', () => {
    let totalEntry = 0;
    let totalExpense = 0;

    const expenseForm = document.getElementById('expense-form');
    const expenseTableBody = document.getElementById('expense-table-body');
    const totalEntryEl = document.getElementById('total-entry');
    const totalExpenseEl = document.getElementById('total-expense');
    const totalBalanceEl = document.getElementById('total-balance');

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const date = document.getElementById('date').value;

        // Determine if the amount is an entry or expense
        let transactionType;
        if (amount >= 0) {
            totalEntry += amount;
            transactionType = 'entry';
        } else {
            totalExpense += Math.abs(amount);
            transactionType = 'expense';
        }

        updateDisplay();
        addTransactionToTable(description, category, amount, date);

        // Alert based on the transaction type using SweetAlert
        showTransactionAlert(transactionType, amount);

        expenseForm.reset();
    });

    function updateDisplay() {
        // Display total entry, total expense with proper signs
        totalEntryEl.innerText = `R$ ${totalEntry.toFixed(2)}`;
        totalExpenseEl.innerText = `R$ ${totalExpense === 0 ? '0.00' : `-${totalExpense.toFixed(2)}`}`;
        totalBalanceEl.innerText = `R$ ${(totalEntry - totalExpense).toFixed(2)}`;
    }

    function addTransactionToTable(description, category, amount, date) {
        const row = expenseTableBody.insertRow();

        row.insertCell(0).innerText = description;
        row.insertCell(1).innerText = category;
        row.insertCell(2).innerText = `R$ ${amount.toFixed(2)}`;
        row.insertCell(3).innerText = date;

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remover';
        removeButton.addEventListener('click', () => {
            if (amount >= 0) {
                totalEntry -= amount;
            } else {
                totalExpense -= Math.abs(amount);
            }

            updateDisplay();
            row.remove();
        });

        row.insertCell(4).appendChild(removeButton);
    }

    function showTransactionAlert(type, amount) {
        let message;
        let icon;
        if (type === 'entry') {
            message = `Entrada registrada: R$ ${amount.toFixed(2)}`;
            icon = 'success';
        } else if (type === 'expense') {
            message = `Despesa registrada: R$ -${amount.toFixed(2)}`;
            icon = 'error';
        } else {
            message = 'Transação registrada';
            icon = 'info';
        }
        
        // SweetAlert
        Swal.fire({
            title: 'Registro de Transação',
            text: message,
            icon: icon,
            confirmButtonText: 'OK'
        });
    }
});
