if(localStorage.getItem('token')){
    let log = document.querySelector('#login')
    log.innerText = 'logout'
    log.addEventListener('click', function(e) {
        e.preventDefault()
        localStorage.removeItem('token')
        window.location.href = "./index.html";
    })
}

