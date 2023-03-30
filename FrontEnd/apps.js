const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

import {genererGallerie} from './works.js'

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
    document.querySelector('.miniature').innerHTML = ''
    genererGallerieModal(works)
}

const closeModal = async function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal = null
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    document.querySelector(".gallery").innerHTML = '';
    genererGallerie(works);
    let arrowButton = document.querySelector('.back-modal')
    arrowButton.style.display = "none";
    let modalTitle = document.querySelector('#title-modal')
    modalTitle.innerHTML = 'Galerie photo'
    genererGallerieModal(works)
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

/**
 * gallery dans modal
 */

function genererGallerieModal(works) {
    for(let i=0; i<works.length; i++){
        const project = works[i];
        const galleryMiniature = document.querySelector('.miniature')
        const figWorksModal = document.createElement("figure")
        const imageWorksModal = document.createElement("img");
        imageWorksModal.className = "image-gallery-modal"
        imageWorksModal.src = project.imageUrl;
        const captionWorksModal = document.createElement("figcaption");
        captionWorksModal.innerHTML = "éditer";
        const poubelleButton = document.createElement("button");
        poubelleButton.className = "poubelle-button"
        const poubelleIcone = document.createElement("img");
        poubelleIcone.className = "poubelle-modal"
        poubelleIcone.src = "./assets/images/poubelle.png";
        galleryMiniature.appendChild(figWorksModal);
        figWorksModal.appendChild(imageWorksModal);
        figWorksModal.appendChild(captionWorksModal);
        poubelleButton.appendChild(poubelleIcone);
        figWorksModal.appendChild(poubelleButton)
        poubelleButton.addEventListener("click", function(event) {
            functionDelete(project, event)
        })
    }
}

genererGallerieModal(works)

const functionDelete = async function (work, event) {
    event.stopPropagation()
    let id = work.id
    const del = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    }).then(response => response) 

    if(del.ok) {
        document.querySelector(".miniature").innerHTML = '';
        const response = await fetch("http://localhost:5678/api/works");
        const works = await response.json();
        console.log(works)
        if(works.length===0) {
            closeModal(event)
        }
        else {
            genererGallerieModal(works)
        }
    }
}

//ajouter une photo

const ajouterPhoto = document.querySelector('#ajouter-photo-modal')
ajouterPhoto.addEventListener("click", function() {
    let arrowButton = document.querySelector('.back-modal')
    arrowButton.style.display = null
    let modalTitle = document.querySelector('#title-modal')
    modalTitle.innerHTML = 'Ajout photo'
    let galleryMiniature = document.querySelector(".miniature")
    galleryMiniature.innerHTML = ''
    const formModal = document.createElement('form')
    galleryMiniature.appendChild(formModal);
    const fieldsetModal = document.createElement('fieldset')
    fieldsetModal.className = "fieldset-modal"
    formModal.appendChild(fieldsetModal)
    const iconeFormModal = document.createElement('i')
    iconeFormModal.className = "fa-sharp fa-solid fa-image"
    fieldsetModal.appendChild(iconeFormModal)
    const buttonFormModal = document.createElement('input')
    buttonFormModal.setAttribute('type', 'file')
    buttonFormModal.className = "button-form-modal"
    fieldsetModal.appendChild(buttonFormModal)
    const spanFormModal = document.createElement('span')
    spanFormModal.innerText = 'jpg, png : 4mo max'
    fieldsetModal.appendChild(spanFormModal)
})




