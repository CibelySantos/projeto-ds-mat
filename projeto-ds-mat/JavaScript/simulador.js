
function calcular() {
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const juros = parseFloat(document.getElementById('juros').value) / 100;

    const taxaMensal = Math.pow(1 + juros, 1 / 12) - 1;
    const parcela = valor * taxaMensal / (1 - Math.pow(1 + taxaMensal, -prazo));

    const custoTotal = parcela * prazo;
    const jurosPagos = custoTotal - valor;

    document.getElementById('resultados').innerHTML = `
            <h2>Resultados da Simulação</h2>
            <p>Valor da Parcela: R$ ${parcela.toFixed(2)}</p>
            <p>Custo Total do Crédito: R$ ${custoTotal.toFixed(2)}</p>
            <p>Total de Juros Pagos: R$ ${jurosPagos.toFixed(2)}</p>
            <div class="chart-container">
                <canvas id="grafico"></canvas>
            </div>
        `;

    gerarGrafico(valor, prazo, taxaMensal, parcela);
}

function gerarGrafico(valor, prazo, taxaMensal, parcela) {
    const ctx = document.getElementById('grafico').getContext('2d');
    const saldoDevedor = [];
    let saldo = valor;

    for (let i = 0; i <= prazo; i++) {
        saldoDevedor.push(saldo.toFixed(2));
        saldo -= (parcela - saldo * taxaMensal);
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: prazo + 1 }, (_, i) => i),
            datasets: [{
                label: 'Saldo Devedor',
                data: saldoDevedor,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Saldo (R$)'
                    }
                }
            }
        }
    });
}