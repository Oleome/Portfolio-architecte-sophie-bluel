if(sessionStorage.getItem('token')){
    /**
     * création bouton logout
     */
    let log = document.querySelector('#login')
    log.innerText = 'logout'
    log.addEventListener('click', function(e) {
        e.preventDefault()
        sessionStorage.removeItem('token')
        window.location.href = "./index.html";
    })

    /**
     * affichage bandeau admin
     */
    let bandeauAdmin = document.querySelector('.bandeau-admin') 
    bandeauAdmin.style.display = null  
    document.body.prepend(bandeauAdmin)

    /**
     * afficher bouton modifier 
     */

    let boutonModifier = document.querySelector('.pen-modifier')
    boutonModifier.style.display = null    

    let boutonModifierASide = document.querySelector('.js-pen-modifier')
    boutonModifierASide.style.display = null
}

