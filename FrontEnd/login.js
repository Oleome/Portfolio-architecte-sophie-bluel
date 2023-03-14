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
    });
    });
} 

ajoutListenerIdentifiants() 