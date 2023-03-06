const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();
console.error(works);

const project = works[0];
const figWorks = document.createElement("figure")
const imageWorks = document.createElement("img");
imageWorks.src = project.imageUrl;
const captionWorks = document.createElement("figcaption");
captionWorks.innerText = project.title;

const sectionGallery = document.querySelector(".gallery");
sectionGallery.appendChild(figWorks);
sectionGallery.appendChild(imageWorks);
sectionGallery.appendChild(captionWorks);