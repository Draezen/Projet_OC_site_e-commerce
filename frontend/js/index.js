let listeProduits = [];
const urlTeddies = "http://localhost:3000/api/teddies";
const lang = document.getElementById("lang")

//récupération de la liste des oursons
function recupererProduit (url) {
    listeProduits = getProduct(url);
    return listeProduits
}

//affichage des oursons sur la page d'accueil
recupererProduit(urlTeddies).then (listeProduits => {
    //console.log(listeProduits);
    creerListeProduit(listeProduits, "teddies");
})

//changement de langue
lang.addEventListener("change", function () {
    recupererProduit(urlTeddies).then (listeProduits => {
        changementPrix(lang.value, listeProduits)
    })
})