const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();


for(let i=0; i<works.length; i++){

const project = works[i];
const sectionGallery = document.querySelector(".gallery");
const figWorks = document.createElement("figure")
const imageWorks = document.createElement("img");
imageWorks.src = project.imageUrl;
const captionWorks = document.createElement("figcaption");
captionWorks.innerText = project.title;


sectionGallery.appendChild(figWorks);
figWorks.appendChild(imageWorks);
figWorks.appendChild(captionWorks);
}