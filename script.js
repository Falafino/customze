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
