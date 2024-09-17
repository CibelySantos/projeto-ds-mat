document.addEventListener('DOMContentLoaded', function() {
    // Adiciona o efeito de "scroll" à navbar
    window.addEventListener('scroll', handleScroll);

    // Destaca o link ativo na navbar ao rolar a página
    function handleScroll() {
        const navbar = document.getElementById('navbar');
        const sections = document.querySelectorAll('.topic');
        const navLinks = document.querySelectorAll('.nav-link');

        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 60 && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('data-topic');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Funções do Modal
    document.querySelectorAll('.topic').forEach(topic => {
        topic.addEventListener('click', () => showInfo(topic.getAttribute('data-topic')));
    });

    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('infoModal')) {
            closeModal();
        }
    });
});

function showInfo(topic) {
    let message = '';

    switch(topic) {
        case 'tipos':
            message = '• Juros Simples: \n O juros simples é calculado com base em um valor fixado chamado de capital inicial. Trata-se de uma porcentagem do capital inicial aplicada durante determinado tempo. A principal característica do juros simples é que o valor não se altera no decorrer dos meses. \n \n • Juros compostos: \n O Juros Compostos é um regime de capitalização em que os juros de um período incidem sobre o valor acumulado até o período imediatamente anterior. Como o período anterior já está acrescido de juros, então esse regime também é conhecido como “juros sobre juros”. \n \n • Juros Variáveis: \n Juros Variáveis são taxas que mudam ao longo do tempo. Elas são baseadas em índices de referência, como a taxa Selic ou LIBOR. Se o índice sobe, a taxa de juros também sobe, e vice-versa. \n\n Entre outros...';
            break;
        case 'composicao':
            message = 'Fórmulas: Os juros são calculados com base no valor principal, na taxa de juros e no período.';
            break;
        case 'estrategias':
            message = 'Estratégias para Reduzir Dívidas: \n\n\n • Priorize o pagamento de dívidas com juros mais altos. \n\n • Negocie taxas de juros mais baixas com seus credores. \n\n • Crie um orçamento mais detalhado \n\n Para mais informações, procure um especialista.';
            break;
        case 'recursos':
            message = 'Recursos Adicionais: Consulte livros de educação financeira, sites especializados e cursos online para aprender mais.';
            break;
        default:
            message = 'Informação não disponível.';
    }

    const modal = document.getElementById("infoModal");
    document.getElementById("modalText").innerText = message;
    modal.classList.add('show');
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("infoModal");
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300); // Tempo de transição do modal
}
