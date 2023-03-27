function ajoutListenerIdentifiants() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", async function (event) {
        event.preventDefault()
        const login = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
        };
        const chargeUtile = JSON.stringify(login);
        const request = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile
        }) .then(response => response)
        
        const data = await request.json()
        if (request.ok) {
            // Le formulaire est valide, redirection vers la page admin
            window.location.href = "./index.html";
            localStorage.setItem("token", data.token)
        } else {
            // Le formulaire est invalide, message d'erreur
            const messageErreur = document.createElement("div");
            messageErreur.textContent = "Erreur dans l’identifiant ou le mot de passe";
            messageErreur.classList.add("message-erreur");
            formulaireLogin.appendChild(messageErreur);
        }
        
    });
} 

ajoutListenerIdentifiants() 