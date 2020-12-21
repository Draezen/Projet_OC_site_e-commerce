
const params = (new URL(document.location)).searchParams;
const id = params.get("id")
const urlTeddies = "http://localhost:3000/api/teddies";
const urlTeddy = urlTeddies + "/" + id;

const addToBasketButton = document.getElementById("addToBasket");

//récupération des infos de l'ourson
function recupererProduit (urlTeddy) {
    infosProduit = getProduct(urlTeddy);
    return infosProduit
}

//affichage de l'ourson sur la page produit
recupererProduit(urlTeddy).then (infosProduit => {
    creerProduit(infosProduit, "teddy");
})

//changement de langue
lang.addEventListener("change", function () {
    recupererProduit(urlTeddy).then (infosProduit => {
        const lang = document.getElementById("lang");
        const listeProduits = [infosProduit];
        changementPrix(lang.value, listeProduits, "teddy")
    })
})

addToBasketButton.addEventListener("click", function () {
    console.log(document.location)
})