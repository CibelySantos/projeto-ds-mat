// Gerenciador de Despesas

// Variáveis para armazenar os totais
let totalEntrada = 0;
let totalSaida = 0;

// Adiciona um listener para o envio do formulário
document.getElementById('expense-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtém os valores do formulário
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    // Atualiza os totais de entrada e saída
    if (amount >= 0) {
        totalEntrada += amount;
    } else {
        totalSaida += Math.abs(amount);
    }

    // Atualiza a exibição dos valores
    updateDisplay();

    // Adiciona a transação à tabela
    addTransactionToTable(description, amount, date);

    // Limpa o formulário
    document.getElementById('expense-form').reset();
});

// Função para atualizar a exibição dos totais
function updateDisplay() {
    document.getElementById('total-entrada').innerText = `R$ ${totalEntrada.toFixed(2)}`;
    document.getElementById('total-saida').innerText = `-R$ ${totalSaida.toFixed(2)}`;
    document.getElementById('saldo-total').innerText = `R$ ${(totalEntrada - totalSaida).toFixed(2)}`;
}

// Função para adicionar uma transação à tabela
function addTransactionToTable(description, amount, date) {
    const table = document.getElementById('expense-table');
    const row = table.insertRow();

    // Adiciona as células à nova linha
    row.insertCell(0).innerText = description;
    row.insertCell(1).innerText = `R$ ${amount.toFixed(2)}`;
    row.insertCell(2).innerText = date;

    // Adiciona o botão de remover
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remover';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', function() {
        // Atualiza os totais ao remover uma transação
        if (amount >= 0) {
            totalEntrada -= amount;
        } else {
            totalSaida -= Math.abs(amount);
        }
        
        // Atualiza a exibição dos totais
        updateDisplay();

        // Remove a linha da tabela
        row.remove();
    });
    
    row.insertCell(3).appendChild(removeButton);
}
