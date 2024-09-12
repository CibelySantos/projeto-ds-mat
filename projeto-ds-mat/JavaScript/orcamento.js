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

        // Alert based on the transaction type
        showTransactionAlert(transactionType, amount);

        expenseForm.reset();
    });

    function updateDisplay() {
        totalEntryEl.innerText = `R$ ${totalEntry.toFixed(2)}`;
        totalExpenseEl.innerText = `-R$ ${totalExpense.toFixed(2)}`;
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
        switch (type) {
            case 'entry':
                message = `Entrada registrada: R$ ${amount.toFixed(2)}`;
                break;
            case 'expense':
                message = `Despesa registrada: -R$ ${amount.toFixed(2)}`;
                break;
            default:
                message = 'Transação registrada';
        }
        alert(message);
    }
});
