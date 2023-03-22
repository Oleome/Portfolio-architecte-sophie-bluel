

let modal = null
const focusableSelector = 'button, a, input'
let focusablesElements = []
let previouslyFocusedElement = null

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusablesElements = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    modal.style.display = null
    focusablesElements[0].focus()
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal = null
}

const stopPropagation = function(e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusablesElements.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    }
    else {
        index++
    }   
    if (index >= focusablesElements.length) {
        index = 0
    }
    if (index < 0) {
        index = focusablesElements.length -1
    }
    focusablesElements[index].focus()
}

document.querySelectorAll('.js-modal').forEach( a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key ==="Tab" && modal !== null) {
        focusInModal(e)
    }
})

const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();
/**
 * tentative crétion gallery dans modal
 */
for(let i=0; i<works.length; i++){
    const project = works[i];
    const galleryMiniature = document.querySelector('.miniature')
    const figWorksModal = document.createElement("figure")
    const imageWorksModal = document.createElement("img");
    imageWorksModal.src = project.imageUrl;
    const captionWorksModal = document.createElement("figcaption");
    captionWorksModal.innerHTML = "éditer";
    galleryMiniature.appendChild(figWorksModal);
    figWorksModal.appendChild(imageWorksModal);
    figWorksModal.appendChild(captionWorksModal);
}





