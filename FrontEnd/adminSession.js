if(localStorage.getItem('token')){
    let log = document.querySelector('#login')
    log.removeAttribute('href')
    log.innerText = 'logout'
}