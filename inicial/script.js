let carrinho = [];

function adicionarAoCarrinho(nome, preco, quantidade) {
    quantidade = parseInt(quantidade);
    const produto = { nome, preco, quantidade };
    const produtoExistente = carrinho.find(item => item.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade += quantidade;
    } else {
        carrinho.push(produto);
    }

    atualizarCarrinho();
    alert(`${quantidade}x ${nome} adicionado(s) ao carrinho!`);
}

function atualizarCarrinho() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalElement = document.getElementById('total');
    
    cartItems.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    carrinho.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
        cartItems.appendChild(itemElement);
        
        total += item.preco * item.quantidade;
        itemCount += item.quantidade;
    });

    totalElement.textContent = total.toFixed(2);
    cartCount.textContent = itemCount;
}

function toggleCarrinho() {
    const carrinhoElement = document.getElementById('carrinho');
    carrinhoElement.classList.toggle('aberto');
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    alert('Compra finalizada com sucesso!');
    carrinho = [];
    atualizarCarrinho();
    toggleCarrinho();
}

function pesquisarProdutos() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const produtos = document.querySelectorAll('.produto');

    produtos.forEach(produto => {
        const nome = produto.querySelector('p').textContent.toLowerCase();
        if (nome.includes(query)) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
}

function verProdutos() {
    window.scrollTo({ top: document.querySelector('.produtos').offsetTop, behavior: 'smooth' });
}

function mostrarTodosOsProdutos() {
    const produtos = document.querySelectorAll('.produto');
    produtos.forEach(produto => {
        produto.style.display = 'block';
    });
}

function openCadastroModal() {
    const modal = document.getElementById('cadastro-modal');
    modal.style.display = 'block';
}

function closeCadastroModal() {
    const modal = document.getElementById('cadastro-modal');
    modal.style.display = 'none';
}

function toggleNightMode() {
    document.body.classList.toggle('night-mode');
    document.querySelector('header').classList.toggle('night-mode');
    document.querySelector('nav').classList.toggle('night-mode');
}


/*timer*/

function iniciarContadorRegressivo() {
    // 1. DEFINE A DATA FINAL DA PROMOÇÃO (Mês/Dia/Ano Horas:Minutos:Segundos)
    // Exemplo: 11 de Dezembro de 2025 às 23:59:59
    const dataFinal = new Date("Nov 15, 2025 23:59:59").getTime();

    // 2. ATUALIZA O CONTADOR A CADA 1 SEGUNDO
    const x = setInterval(function() {
        // Pega a data e hora atuais
        const agora = new Date().getTime();

        // Calcula a distância (diferença) entre o agora e a data final
        const distancia = dataFinal - agora;

        // 3. CÁLCULOS
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // 4. EXIBE O RESULTADO NO HTML
        if (distancia > 0) {
            // Usa .padStart(2, '0') para garantir dois dígitos (ex: 09, 10)
            document.getElementById("days").innerHTML = String(dias).padStart(2, '0');
            document.getElementById("hours").innerHTML = String(horas).padStart(2, '0');
            document.getElementById("minutes").innerHTML = String(minutos).padStart(2, '0');
            document.getElementById("seconds").innerHTML = String(segundos).padStart(2, '0');
        } else {
            // 5. QUANDO O TEMPO ACABA
            clearInterval(x); // Para o contador
            document.getElementById("countdown").style.display = "none"; // Esconde o timer
            document.getElementById("expired-message").style.display = "block"; // Mostra mensagem de expirado
        }
    }, 1000); // 1000 milissegundos = 1 segundo
}

// Chame a função quando a página carregar
document.addEventListener('DOMContentLoaded', iniciarContadorRegressivo);


/*final !!!!!!*/
