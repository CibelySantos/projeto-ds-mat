function showInfo(topic) {
    let message = '';

    switch(topic) {
        case 'tipos':
            message = 'Tipos de Juros: Existem juros simples, compostos, fixos, variáveis, entre outros.';
            break;
        case 'composicao':
            message = 'Como os Juros Compõem: Os juros são calculados com base no valor principal, na taxa de juros e no período.';
            break;
        case 'estrategias':
            message = 'Estratégias para Reduzir Dívidas: 1. Crie um orçamento detalhado. 2. Priorize dívidas com juros mais altos. 3. Negocie com seus credores para obter taxas mais baixas.';
            break;
        case 'recursos':
            message = 'Recursos Adicionais: Consulte livros de educação financeira, sites especializados e cursos online para aprender mais.';
            break;
        default:
            message = 'Informação não disponível.';
    }

    document.getElementById("modalText").innerText = message;
    document.getElementById("infoModal").style.display = "block";
}

function closeModal() {
    document.getElementById("infoModal").style.display = "none";
}
