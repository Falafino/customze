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


/* ==========================================================
   TIMER DE PROMOÇÃO - RODA PARA SEMPRE
   ========================================================== */

function iniciarContadorRegressivo() {
    // Define uma data alvo (exemplo: 31 de dezembro de 2026)
    // Você pode mudar a data para qualquer outra
    const dataAlvo = new Date("December 31, 2026 23:59:59").getTime();

    // Atualiza o timer a cada 1 segundo
    const intervalo = setInterval(() => {
        const agora = new Date().getTime();
        const distancia = dataAlvo - agora;

        // Calcula dias, horas, minutos e segundos
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        // Atualiza os elementos HTML
        document.getElementById("days").innerHTML = dias < 10 ? "0" + dias : dias;
        document.getElementById("hours").innerHTML = horas < 10 ? "0" + horas : horas;
        document.getElementById("minutes").innerHTML = minutos < 10 ? "0" + minutos : minutos;
        document.getElementById("seconds").innerHTML = segundos < 10 ? "0" + segundos : segundos;

        // Se a data alvo já passou
        if (distancia < 0) {
            clearInterval(intervalo);
            document.getElementById("countdown").innerHTML = '<div class="timer-expirado">🎉 PROMOÇÃO ENCERRADA 🎉</div>';
        }
    }, 1000);
}

/* ==========================================================
   FUNÇÕES DA PÁGINA
   ========================================================== */

// Pesquisar produtos
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

// Modo Noturno
window.toggleNightMode = function() {
    document.body.classList.toggle('night-mode');
    document.querySelector('.top-bar')?.classList.toggle('night-mode');
    document.querySelector('nav')?.classList.toggle('night-mode');
};

// Inicialização da página
document.addEventListener("DOMContentLoaded", () => {
    iniciarContadorRegressivo();
});