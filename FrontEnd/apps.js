import {genererGallerie} from './works.js'
import {apiUrl} from './api.js';

let modal = null
let modal2 = null
const focusableSelector = 'button, a'
let focusablesElements = []
let previouslyFocusedElement = null
const ajouterPhoto = document.querySelector('#ajouter-photo-modal')
const allowedTypes = ["image/png", "image/jpg"];

const openModal = async function (e) {
    e.preventDefault()
    const response = await fetch(`${apiUrl}/works`);
    const works = await response.json();
    modal = document.querySelector('#modal1')
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
    const response = await fetch(`${apiUrl}/works`);
    const works = await response.json();
    document.querySelector(".gallery").innerHTML = '';
    genererGallerie(works);
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

document.querySelectorAll('.pen-modifier').forEach( a => {
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

//Gallerie dans modal

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
        captionWorksModal.className = "edit"
        const poubelleButton = document.createElement("button");
        poubelleButton.className = "poubelle-button"
        const poubelleIcone = document.createElement("i");
        poubelleIcone.className = "fa-solid fa-trash-can"
        const mooveIcone = document.createElement('i')
        mooveIcone.className = "fa-solid fa-up-down-left-right"
        mooveIcone.style.display = "none"
        imageWorksModal.addEventListener('mouseenter', function() {
            mooveIcone.style.display = null
        })
        imageWorksModal.addEventListener('mouseleave', function() {
            mooveIcone.style.display = "none"
        })
        galleryMiniature.appendChild(figWorksModal);
        figWorksModal.appendChild(imageWorksModal);
        figWorksModal.appendChild(captionWorksModal);
        poubelleButton.appendChild(poubelleIcone);
        figWorksModal.appendChild(poubelleButton);
        figWorksModal.appendChild(mooveIcone)
        poubelleButton.addEventListener("click", function(event) {
            functionDelete(project, event)
        })
    }
}

const functionDelete = async function (work, event) {
    event.stopPropagation()
    let id = work.id
    const del = await fetch(`${apiUrl}/works/${id}`, {
        method: 'DELETE',
        headers: {
            "accept": "*/*",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        }
    })

    if(del.ok) {
        document.querySelector(".miniature").innerHTML = '';
        const response = await fetch(`${apiUrl}/works`);
        const works = await response.json();
        if(works.length===0) {
            closeModal(event)
        }
        else {
            genererGallerieModal(works)
        }
    }
}

//ajouter une photo

ajouterPhoto.addEventListener("click", function(e) {
    closeModal(e)
    openModal2(e)
})

const openModal2 = function (e) {
    e.preventDefault(e)
    modal2 = document.querySelector('#modal2')
    modal2.style.display = null
    modal2.removeAttribute('aria-hidden')
    modal2.setAttribute('aria-modal', 'true')
    document.querySelector('.form-modal').innerHTML = ''
    modal2.addEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-close').addEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
    const divFormModal = document.querySelector('.form-modal')
    const formModal = document.createElement('form')
    formModal.className = "form-modal"
    divFormModal.appendChild(formModal)
    const fieldsetModal = document.createElement('fieldset')
    fieldsetModal.className = "fieldset-modal"
    formModal.appendChild(fieldsetModal)
    const iconeFormModal = document.createElement('i')
    iconeFormModal.className = "fa-sharp fa-regular fa-image"
    fieldsetModal.appendChild(iconeFormModal)
    const previewImageModal = document.createElement('img')
    previewImageModal.style.display = 'none'
    previewImageModal.className = 'preview-img-modal'
    fieldsetModal.appendChild(previewImageModal)
    const buttonFormModal = document.createElement('input')
    buttonFormModal.setAttribute('type', 'file')
    buttonFormModal.setAttribute('name', 'upload-image')
    buttonFormModal.className = "button-form-modal"
    buttonFormModal.setAttribute('accept', '.png, .jpg')
    buttonFormModal.setAttribute('id', 'label-file')
    buttonFormModal.style.display = 'none'
    const labelFile = document.createElement('label')
    labelFile.setAttribute('for', 'label-file')
    labelFile.className = 'label-fieldset'
    labelFile.innerHTML = '+ Ajouter photo'
    fieldsetModal.appendChild(labelFile)
    fieldsetModal.appendChild(buttonFormModal)
    const spanFormModal = document.createElement('span')
    spanFormModal.innerText = 'jpg, png : 4mo max'
    spanFormModal.className = "span-form-modal"
    fieldsetModal.appendChild(spanFormModal)
    buttonFormModal.addEventListener('change', function() {
        if(buttonFormModal.files[0].size > 4000000) {
            alert("Le fichier est trop volumineux : 4Mo maximum !")
            return
        }
        if(!allowedTypes.includes(buttonFormModal.files[0].type)) {
            alert("Le fichier doit être de type : jpg ou png !")
            return
        }
        else {
            previewImageModal.src = URL.createObjectURL(buttonFormModal.files[0])
            previewImageModal.style.display = null
            buttonFormModal.style.display = "none"
            iconeFormModal.style.display = "none"
            labelFile.style.display = "none"
            spanFormModal.style.display = "none"
        }
    })
    const labelTitle = document.createElement('label')
    labelTitle.className = 'label-modal'
    labelTitle.setAttribute('for', 'form-title')
    labelTitle.innerHTML = 'Titre'
    formModal.appendChild(labelTitle)
    const inputTitle = document.createElement('input')
    inputTitle.required = true
    inputTitle.className = "input-title-modal"
    inputTitle.setAttribute('id', 'form-title')
    inputTitle.setAttribute('name', 'title')
    formModal.appendChild(inputTitle)
    const labelCategory = document.createElement('label')
    labelCategory.className = 'label-modal'
    labelCategory.setAttribute('for', 'form-category')
    labelCategory.innerHTML = 'Catégorie'
    formModal.appendChild(labelCategory)
    const selectCategory = document.createElement('select')
    selectCategory.className = "select-category-modal"
    selectCategory.setAttribute('id', 'form-category')
    selectCategory.setAttribute('name', 'category')
    selectCategory.required = true
    const optionSelectEmpty = document.createElement('option')
    optionSelectEmpty.innerHTML = ''
    selectCategory.appendChild(optionSelectEmpty)
    const optionSelectObject = document.createElement('option')
    optionSelectObject.innerHTML = 'Objet'
    optionSelectObject.setAttribute('value', '1')
    selectCategory.appendChild(optionSelectObject)
    const optionSelectAppartement = document.createElement('option')
    optionSelectAppartement.innerHTML = 'Appartement'
    optionSelectAppartement.setAttribute('value', '2')
    selectCategory.appendChild(optionSelectAppartement)
    const optionSelectHorest = document.createElement('option')
    optionSelectHorest.innerHTML = 'Hôtels et restaurants'
    optionSelectHorest.setAttribute('value', '3')
    selectCategory.appendChild(optionSelectHorest)
    formModal.appendChild(selectCategory)
    const border = document.createElement('hr')
    border.className = "border"
    formModal.appendChild(border)
    const submitButton = document.createElement('input')
    submitButton.className = "se-connecter"
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('value', 'Valider')
    formModal.appendChild(submitButton)
    inputTitle.addEventListener('input', function() {
        if(inputTitle.value != '' && selectCategory.value != '' && buttonFormModal.files.length > 0) {
            submitButton.style.backgroundColor = '#1D6154'
        }
    })
    selectCategory.addEventListener('change', function() {
        if(inputTitle.value != '' && selectCategory.value != '' && buttonFormModal.files.length > 0) {
            submitButton.style.backgroundColor = '#1D6154'
        }
    })
    buttonFormModal.addEventListener('change', function() {
        if(inputTitle.value != '' && selectCategory.value != '' && buttonFormModal.files.length > 0) {
            submitButton.style.backgroundColor = '#1D6154'
        }
    })
}

const closeModal2 = async function (e) {
    if (modal2 === null) return
    e.preventDefault()
    modal2.style.display = "none"
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal')
    modal2.removeEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-close').removeEventListener('click', closeModal2)
    modal2 = null
    const response = await fetch(`${apiUrl}/works`);
    const works = await response.json();
    document.querySelector(".gallery").innerHTML = '';
    genererGallerie(works);
}

const arrowBackModal = document.querySelector('.js-back-modal')

arrowBackModal.addEventListener('click', function(e) {
    e.preventDefault()
    closeModal2(e)
    openModal(e)
})


// envoie de nouveau works
function ajoutWork () {
    const formulaireModal = document.querySelector('.form-modal')
    formulaireModal.addEventListener('submit', async function(e) {
        e.preventDefault()
          
        const envoiPhoto = {
            image: e.target.querySelector("[name=upload-image]").files[0],
            title: e.target.querySelector("[name=title]").value,
            category: parseInt(e.target.querySelector("[name=category]").value),
        }; 

        const chargeUtile = new FormData()
        chargeUtile.append('image', envoiPhoto.image)
        chargeUtile.append('title', envoiPhoto.title)
        chargeUtile.append('category', envoiPhoto.category)

        if(envoiPhoto.image === undefined) {
            alert("Veuillez sélectionner une photo !");
            return
        }

        const request = await fetch(`${apiUrl}/works`, {
            method: "POST",
            headers: {
                "accept": "*/*",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            },
            body: chargeUtile
        }) 
        if (request.ok) {  
            alert("Votre projet a bien été envoyé !")     
            document.querySelector(".preview-img-modal").style.display = "none"
            document.querySelector(".fa-image").style.display = null
            document.querySelector(".label-fieldset").style.display = null
            document.querySelector(".span-form-modal").style.display = null
            openModal2(e)
            const response = await fetch(`${apiUrl}/works`);
            const works = await response.json();
            genererGallerie(works)
        } else {
            alert("Votre projet n'a pas pu être envoyé")
            return
        }
    })
}

ajoutWork()