// Gerenciador de Despesas
let totalEntrada = 0;
let totalSaida = 0;

document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtém os valores do formulário
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    // Verifica se é entrada ou saída
    if (amount >= 0) {
        totalEntrada += amount;
    } else {
        totalSaida += Math.abs(amount);
    }

    // Atualiza a exibição dos valores
    document.getElementById('total-entrada').innerText = `R$ ${totalEntrada.toFixed(2)}`;
    document.getElementById('total-saida').innerText = `-R$ ${totalSaida.toFixed(2)}`;
    document.getElementById('saldo-total').innerText = `R$ ${(totalEntrada - totalSaida).toFixed(2)}`;

    // Adiciona a transação à tabela
    const table = document.getElementById('expense-table');
    const row = table.insertRow();
    row.insertCell(0).innerText = description;
    row.insertCell(1).innerText = `R$ ${amount.toFixed(2)}`;
    row.insertCell(2).innerText = date;

    // Botão de remover com funcionalidade
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remover';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', function() {
        // Atualizar o saldo total
        if (amount >= 0) {
            totalEntrada -= amount;
        } else {
            totalSaida -= Math.abs(amount);
        }

        document.getElementById('total-entrada').innerText = `R$ ${totalEntrada.toFixed(2)}`;
        document.getElementById('total-saida').innerText = `-R$ ${totalSaida.toFixed(2)}`;
        document.getElementById('saldo-total').innerText = `R$ ${(totalEntrada - totalSaida).toFixed(2)}`;

        row.remove();
    });
    row.insertCell(3).appendChild(removeButton);

    // Limpa o formulário
    document.getElementById('expense-form').reset();
});
