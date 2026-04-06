/* =======================
   finaliza.js - Carrinho Unificado (Firebase v9+)
======================= */

import { auth, db } from "/cadastro/firebase-init.js";
import {
  onAuthStateChanged, signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc, setDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let carrinho = [];
let currentUserId = null;

const container = document.querySelector('.carrinho-itens');
const totalElement = document.getElementById('total-geral');
const btnFinalizar = document.getElementById('btn-finalizar');

/* ---------- Carregar e Salvar ---------- */
async function carregarCarrinho() {
  if (!currentUserId) return;
  try {
    const ref = doc(db, "carrinhos", currentUserId);
    const snap = await getDoc(ref);
    carrinho = snap.exists() ? snap.data().itens || [] : [];
  } catch (e) {
    console.error("Erro ao carregar carrinho:", e);
  }
  renderizarCarrinho();
}

async function salvarCarrinho() {
  if (!currentUserId) return;
  try {
    const ref = doc(db, "carrinhos", currentUserId);
    await setDoc(ref, { itens: carrinho, ultimaAtualizacao: serverTimestamp() });
  } catch (e) {
    console.error("Erro ao salvar carrinho:", e);
  }
}

/* ---------- Renderizar DOM ---------- */
function renderizarCarrinho() {
  container.innerHTML = '';
  let totalGeral = 0;

  if (carrinho.length === 0) {
    container.innerHTML = '<p style="text-align:center; padding: 20px;">Seu carrinho está vazio 😢</p>';
    totalElement.textContent = '0.00';
    return;
  }

  carrinho.forEach((item, i) => {
    const subtotal = item.preco * item.quantidade;
    totalGeral += subtotal;

    const linha = document.createElement('div');
    linha.classList.add('carrinho-item');
    linha.innerHTML = `
      <div>
        <img src="/assets/img/${item.id || 'sem-imagem'}.jpg"
             onerror="this.src='/assets/img/sem-imagem.png';"
             class="imagem-produto" alt="${item.nome}">
        <p>${item.nome}</p>
      </div>
      <div>${item.tamanho || '-'}</div>
      <div>R$ ${item.preco.toFixed(2)}</div>
      <div class="contador">
        <button onclick="alterarQtd(${i}, -1)">-</button>
        <input value="${item.quantidade}" readonly>
        <button onclick="alterarQtd(${i}, 1)">+</button>
      </div>
      <div>R$ ${subtotal.toFixed(2)}</div>
    `;
    container.appendChild(linha);
  });

  totalElement.textContent = totalGeral.toFixed(2);
}

/* ---------- Ações ---------- */
window.alterarQtd = function(i, delta) {
  carrinho[i].quantidade += delta;
  if (carrinho[i].quantidade <= 0) carrinho.splice(i, 1);
  salvarCarrinho();
  renderizarCarrinho();
};

btnFinalizar.addEventListener('click', async () => {
  if (carrinho.length === 0) {
    showMessage("Seu carrinho está vazio!", "warning");
    return;
  }
  showMessage("Compra finalizada com sucesso! 🎉", "success");
  carrinho = [];
  await salvarCarrinho();
  renderizarCarrinho();
  setTimeout(() => window.location.href = "/inicial/inicial.html", 2000);
});

/* ---------- Mensagem temporária ---------- */
function showMessage(msg, type) {
  const box = document.createElement('div');
  box.className = `alert alert-${type}`;
  box.style.position = 'fixed';
  box.style.top = '20px';
  box.style.right = '20px';
  box.style.zIndex = '1000';
  box.textContent = msg;
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 2500);
}

/* ---------- Login e Inicialização ---------- */
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    carregarCarrinho();
  } else {
    signInAnonymously(auth).catch(e => console.error("Erro login anônimo:", e));
  }
});
