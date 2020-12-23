
const urlTeddies = "http://localhost:3000/api/teddies";


//récupération de la liste des oursons
function recupererProduit (url) {
    const response = getProduct(url);
    return response
}

//affichage des oursons sur la page d'accueil
recupererProduit(urlTeddies).then (listeProduits => {
    if (listeProduits.name === "TypeError"){
        serverDown()
    }else {
        creerListeProduit(listeProduits, "teddies");
    }
})


