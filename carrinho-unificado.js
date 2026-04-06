/* ============================================================
   🛒 carrinho-unificado.js — Carrinho único (Firebase + Lateral + Finalizar)
   ============================================================ */

import { auth, db } from "/cadastro/firebase-init.js";
import {
    onAuthStateChanged,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let carrinho = [];
let currentUserId = null;

/* ------------------------------------------------------------
   1. Capturar tamanho selecionado
------------------------------------------------------------ */
let tamanhoSelecionado = null;

document.querySelectorAll(".tamanho-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tamanho-btn").forEach(b => b.classList.remove("selecionado"));
        btn.classList.add("selecionado");
        tamanhoSelecionado = btn.textContent.trim();
    });
});

/* ------------------------------------------------------------
   2. Adicionar ao carrinho (chamada pelo botão Comprar)
------------------------------------------------------------ */
window.adicionarAoCarrinho = async function (nome, preco, qtd = 1) {
    qtd = Number(qtd);

    if (!tamanhoSelecionado) {
        mostrarMensagem("Selecione um tamanho antes de comprar!", "warning");
        return;
    }

    const id = nome.toLowerCase().replace(/ /g, "-"); // gera um ID simples
    const itemExistente = carrinho.find(i => i.id === id && i.tamanho === tamanhoSelecionado);

    if (itemExistente) {
        itemExistente.quantidade += qtd;
    } else {
        carrinho.push({
            id: id,
            nome: nome,
            preco: Number(preco),
            quantidade: qtd,
            tamanho: tamanhoSelecionado
        });
    }

    await salvarCarrinho();
    atualizarCarrinhoLateral();
    mostrarMensagem("Produto adicionado ao carrinho!", "success");
};

/* ------------------------------------------------------------
   3. SALVAR no Firebase
------------------------------------------------------------ */
async function salvarCarrinho() {
    if (!currentUserId) return;

    const ref = doc(db, "carrinhos", currentUserId);
    await setDoc(ref, {
        itens: carrinho,
        ultimaAtualizacao: serverTimestamp()
    });
}

/* ------------------------------------------------------------
   4. CARREGAR do Firebase
------------------------------------------------------------ */
async function carregarCarrinho() {
    if (!currentUserId) return;

    const ref = doc(db, "carrinhos", currentUserId);
    const snap = await getDoc(ref);

    carrinho = snap.exists() ? snap.data().itens || [] : [];
    atualizarCarrinhoLateral();
}

/* ------------------------------------------------------------
   5. Renderizar carrinho lateral (HTML da página inicial)
------------------------------------------------------------ */
function atualizarCarrinhoLateral() {
    const cont = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");
    const contador = document.getElementById("cart-count");

    if (!cont) return;

    cont.innerHTML = "";
    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        quantidadeTotal += item.quantidade;

        const div = document.createElement("div");
        div.classList.add("item-carrinho");
        div.innerHTML = `
            <p><strong>${item.nome}</strong> (${item.tamanho})</p>
            <p>Qtd: ${item.quantidade}</p>
            <p>R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
            <hr>
        `;
        cont.appendChild(div);
    });

    totalEl.textContent = total.toFixed(2);
    contador.textContent = quantidadeTotal;
}

/* ------------------------------------------------------------
   6. Mensagens de aviso/sucesso
------------------------------------------------------------ */
function mostrarMensagem(texto, tipo = "success") {
    const box = document.createElement("div");
    box.className = `alert alert-${tipo}`;
    box.style.position = "fixed";
    box.style.top = "20px";
    box.style.right = "20px";
    box.style.zIndex = "9999";
    box.textContent = texto;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 2500);
}

/* ------------------------------------------------------------
   7. Login anônimo + inicialização
------------------------------------------------------------ */
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUserId = user.uid;
        carregarCarrinho();
    } else {
        signInAnonymously(auth);
    }
});

/* ------------------------------------------------------------
   8. Finalizar compra (da página inicial)
------------------------------------------------------------ */
window.finalizarCompra = function () {
    if (carrinho.length === 0) {
        mostrarMensagem("Seu carrinho está vazio!", "warning");
        return;
    }
    window.location.href = "/inicial/finaliza.html";
};

/* ------------------------------------------------------------
   9. Mostrar/esconder carrinho lateral
------------------------------------------------------------ */
window.toggleCarrinho = function () {
    document.getElementById("carrinho").classList.toggle("aberto");
};
