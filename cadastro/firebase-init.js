// ============================
// 🔥 Firebase Init (centralizado)
// ============================

// Importa as funções necessárias dos SDKs do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getAuth, 
    setPersistence, 
    browserLocalPersistence, 
    signInAnonymously 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuração do seu projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBlkq_lxU5BbRw7yuza1_Cpfm2gRMEVIFM",
    authDomain: "customize-59ba1.firebaseapp.com",
    projectId: "customize-59ba1",
    storageBucket: "customize-59ba1.appspot.com",
    messagingSenderId: "255055710649",
    appId: "1:255055710649:web:de94d07a9e2cac0059ce68"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Mantém login (inclusive anônimo) salvo mesmo após fechar o navegador
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        // Se o usuário ainda não estiver logado, faz login anônimo automaticamente
        if (!auth.currentUser) {
            return signInAnonymously(auth);
        }
    })
    .catch((error) => {
        console.error("Erro ao configurar persistência:", error);
    });
