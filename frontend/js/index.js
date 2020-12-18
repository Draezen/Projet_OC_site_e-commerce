let listeProduits = [];
const urlTeddies = "http://localhost:3000/api/teddies";

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

