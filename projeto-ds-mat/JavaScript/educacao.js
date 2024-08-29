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

// Adiciona o efeito de "scroll" à navbar
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Destaca o link ativo na navbar ao rolar a página
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
