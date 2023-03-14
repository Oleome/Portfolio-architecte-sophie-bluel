function ajoutListenerIdentifiants() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    formulaireLogin.addEventListener("submit", async function (event) {
    const login = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    };
    const chargeUtile = JSON.stringify(login);
    const responseLogin = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: chargeUtile
    }); console.error(responseLogin)
    responseLogin.then(response => {
        if (response.ok) {
            // Le formulaire est valide, on redirige vers la page d'accueil
            window.location.href = "./index.html";
        } else {
            // Le formulaire est invalide, on affiche un message d'erreur
            const messageErreur = document.createElement("div");
            messageErreur.textContent = "Email ou mot de passe incorrect";
            messageErreur.classList.add("message-erreur");
            formulaireLogin.appendChild(messageErreur);
        }
    });
    });

} 

ajoutListenerIdentifiants() 