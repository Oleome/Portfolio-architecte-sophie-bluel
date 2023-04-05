import {apiUrl} from './api.js';

function ajoutListenerIdentifiants() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", async function (event) {
        event.preventDefault()
        const login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        }; 
        const chargeUtile = JSON.stringify(login);
        const request = await fetch(`${apiUrl}/users/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile
        }) 

        const data = await request.json()
        if (request.ok) {
            // Le formulaire est valide, redirection vers la page admin
            localStorage.setItem("token", data.token)
            window.location.href = "./index.html"            
        } else {
            // Le formulaire est invalide, message d'erreur
            const messageErreur = document.createElement("div");
            messageErreur.textContent = `Erreur dans l’identifiant ou le mot de passe`;
            messageErreur.classList.add("message-erreur");
            formulaireLogin.appendChild(messageErreur);
        }
        
    });
} 

ajoutListenerIdentifiants() 