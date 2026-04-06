/* =========================================================
   FUNÇÕES DA PÁGINA (SEM CARRINHO)
   ========================================================= */

/* --- Pesquisar produtos --- */
window.pesquisarProdutos = function() {
  const q = document.getElementById("search-bar")?.value.toLowerCase() || "";
  document.querySelectorAll(".produto").forEach(prod => {
    const nome = prod.querySelector("p")?.textContent?.toLowerCase() || "";
    prod.style.display = nome.includes(q) ? "block" : "none";
  });
};

window.mostrarTodosOsProdutos = function() {
  document.querySelectorAll('.produto').forEach(p => p.style.display = 'block');
};


/* --- Modo Noturno --- */
window.toggleNightMode = function() {
  document.body.classList.toggle('night-mode');
  document.querySelector('.top-bar')?.classList.toggle('night-mode');
  document.querySelector('nav')?.classList.toggle('night-mode');
};





/* --- Inicialização básica da página --- */
document.addEventListener("DOMContentLoaded", () => {
  iniciarContadorRegressivo();
});