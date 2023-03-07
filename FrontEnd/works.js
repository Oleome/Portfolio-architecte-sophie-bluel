const response = await fetch("http://localhost:5678/api/works");
const works = await response.json();

function genererGallerie(works) {
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
}

genererGallerie(works);

const boutonObjets = document.querySelector(".objets");

boutonObjets.addEventListener("click", function () {
    const objetsFiltrer = works.filter(function(work) {
        return work.categoryId == 1;
    });
    document.querySelector(".gallery").innerHTML = '';
    genererGallerie(objetsFiltrer);
});

const boutonAppartements = document.querySelector(".appartements");

boutonAppartements.addEventListener("click", function () {
    const appartementsFiltrer = works.filter(function(work) {
        return work.categoryId == 2;
    }); 
    document.querySelector(".gallery").innerHTML = '';
    genererGallerie(appartementsFiltrer);
});

const boutonHotelRestaurant = document.querySelector(".hotel-restaurant");

boutonHotelRestaurant.addEventListener("click", function () {
    const hotelRestaurantFiltrer = works.filter(function(work) {
        return work.categoryId == 3;
    }); 
    document.querySelector(".gallery").innerHTML = '';
    genererGallerie(hotelRestaurantFiltrer);
});
