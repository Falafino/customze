
import { auth } from "../cadastro/firebase-init.js";


import { 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// ==========================================================
// 1. REFERÊNCIAS AO DOM
// ==========================================================
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailLogin');
const senhaInput = document.getElementById('senhaLogin');
const submitButton = document.getElementById('submitLogin');
const feedbackMessage = document.getElementById('feedbackMessage');
const btnEsqueceuSenha = document.getElementById('btnEsqueceuSenha');
const msgReset = document.getElementById('msgReset');


// ==========================================================
// 2. EVENTOS
// ==========================================================

// Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  logar();
});

// Esqueceu a senha
btnEsqueceuSenha.addEventListener('click', (e) => {
  e.preventDefault();
  enviarEmailRedefinicao();
});


// ==========================================================
// 3. FUNÇÃO DE LOGIN
// ==========================================================
async function logar() {
  const email = emailInput.value.trim();
  const senha = senhaInput.value.trim();
  const PAGINA_INICIAL = "/inicial/inicial.html";

  feedbackMessage.textContent = "";
  msgReset.textContent = "";

  if (!email || !senha) {
    feedbackMessage.textContent = "⚠️ Preencha o email e a senha.";
    return;
  }

  submitButton.disabled = true;
  submitButton.value = "Aguarde...";

  try {
    await signInWithEmailAndPassword(auth, email, senha);

    feedbackMessage.textContent = "✅ Login bem-sucedido! Redirecionando...";
    setTimeout(() => {
      window.location.href = PAGINA_INICIAL;
    }, 800);

  } catch (error) {
    const errorCode = error.code;
    let errorMessage = "Erro ao tentar fazer login.";

    if (
      errorCode === "auth/invalid-email" ||
      errorCode === "auth/user-not-found" ||
      errorCode === "auth/wrong-password" ||
      errorCode === "auth/invalid-credential"
    ) {
      errorMessage = "❌ Email ou senha incorretos.";
    } else if (errorCode === "auth/too-many-requests") {
      errorMessage = "⚠️ Muitas tentativas de login. Tente novamente mais tarde.";
    }

    feedbackMessage.textContent = errorMessage;
    console.error("Erro no Firebase:", error);
  } finally {
    submitButton.disabled = false;
    submitButton.value = "Entrar";
  }
}


// ==========================================================
// 4. FUNÇÃO DE ESQUECEU SENHA
// ==========================================================
async function enviarEmailRedefinicao() {
  const email = emailInput.value.trim();
  msgReset.textContent = "";
  feedbackMessage.textContent = "";

  if (!email) {
    msgReset.textContent = "⚠️ Digite seu email para redefinir a senha.";
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    msgReset.textContent = "📧 Email de redefinição enviado! Verifique sua caixa de entrada ou a de spam";
  } catch (error) {
    console.error("Erro ao enviar email de redefinição:", error);
    if (error.code === "auth/user-not-found") {
      msgReset.textContent = "❌ Este email não está cadastrado.";
    } else if (error.code === "auth/invalid-email") {
      msgReset.textContent = "⚠️ Email inválido. Verifique o endereço digitado.";
    } else {
      msgReset.textContent = "❌ Erro ao enviar email. Tente novamente mais tarde.";
    }
  }
}
