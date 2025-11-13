import { auth } from "./firebase-init.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const form = document.getElementById('form');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const telefoneInput = document.getElementById('telefone');
const textEmail = document.getElementById('textEmail');
const passwordSenha = document.getElementById('passwordsenha');


async function cadastrar() {
  const email = emailInput.value;
  const senha = senhaInput.value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    alert("✅ Cadastro realizado com sucesso!");
    window.location.href = "/login/login.html";
  } catch (error) {
    let errorMessage = "Erro ao cadastrar usuário.";
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = "Este e-mail já está cadastrado.";
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = "E-mail inválido.";
    } else if (error.code === 'auth/weak-password') {
      errorMessage = "A senha precisa ter pelo menos 6 caracteres.";
    }
    alert("❌ " + errorMessage);
    console.error(error);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  cadastrar();
});
