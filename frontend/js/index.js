
const urlTeddies = "http://localhost:3000/api/teddies";


//récupération de la liste des oursons
function recupererProduit (url) {
    const listeProduits = getProduct(url);
    return listeProduits
}

//affichage des oursons sur la page d'accueil
recupererProduit(urlTeddies).then (listeProduits => {
    creerListeProduit(listeProduits, "teddies");
})


