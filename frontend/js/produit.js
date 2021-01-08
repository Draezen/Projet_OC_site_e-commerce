
const params = (new URL(document.location)).searchParams;
const id = params.get("id")
const urlTeddies = "http://localhost:3000/api/teddies";
const urlTeddy = urlTeddies + "/" + id;

const addToBasketButton = document.getElementById("addToBasket");

//récupération des infos de l'ourson
const recupererProduit = (url) => {
    const response = getProduct(url);
    response.then (status => {
        if (status === 500){
           throw new Error("error")
        }
    })
    .catch(function(e){
        messageErreur("main", "urlInvalid", "<h1>URL invalide !</h1> <h2>Veuillez réessayer avec un autre ourson !</h2>")
    })
    return response
}

//affichage de l'ourson sur la page produit
recupererProduit(urlTeddy).then (infosProduit => {
    if(infosProduit.name === "TypeError"){
        messageErreur("main", "serverDown", "<h1>Problème de connexion !</h1> <h2> Veuillez réessayer dans quelques instants !</h2>")
    } else {
    creerProduit(infosProduit, "teddy");
    }
})

//ajout de l'ourson au panier
addToBasketButton.addEventListener("click", function () {
    const name = document.getElementById("teddyName").textContent
    const price = document.getElementById("teddyPrice").textContent
    const product = [{nom : name, prix : price, qte : 1, id : id}]
    ajoutPanier(product)
})

