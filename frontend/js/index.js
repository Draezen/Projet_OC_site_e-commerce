let teddies = [];

const getPost = () => {
    return ajaxGet("http://localhost:3000/api/teddies")
    .then (function (reponse) {
        teddies = JSON.parse(reponse);
        return teddies
    })
    .catch (function (error) {
        console.error("Erreur AJAX", error)
    })
}

//affichage des oursons sur la page d'accueil
getPost().then (function (teddies){
    //console.log(teddies);
    teddies.forEach(function (teddy) {
        let teddiesElt = document.getElementById("teddiesContainer");
        //création des éléments
        let teddyElt = document.createElement("article");
        teddyElt.className = "teddies__card";
        let teddyLink = document.createElement("a");
        teddyLink.href = "produit.html";
        teddyLink.className = "teddies__link";
        let teddyImage = document.createElement("img");
        teddyImage.src = teddy.imageUrl;
        teddyImage.className = "teddies__image";
        let teddyName = document.createElement("h2")
        teddyName.textContent = teddy.name;
        teddyName.className = "teddies__name";
        let teddyPrice = document.createElement("p");
        teddyPrice.textContent = teddy.price + " €";
        teddyPrice.className = "teddies__price";
        //ajout dans le DOM
        teddyElt.appendChild(teddyLink);
        teddyLink.appendChild(teddyImage);
        teddyLink.appendChild(teddyName);
        teddyLink.appendChild(teddyPrice);
        teddiesElt.appendChild(teddyElt);
    });

})

