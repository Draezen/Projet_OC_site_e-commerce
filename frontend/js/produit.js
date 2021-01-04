
const params = (new URL(document.location)).searchParams;
const id = params.get("id")
const urlTeddies = "http://localhost:3000/api/teddies";
const urlTeddy = urlTeddies + "/" + id;

const addToBasketButton = document.getElementById("addToBasket");

//récupération des infos de l'ourson
function recupererProduit (url) {
    const response = getProduct(url);
    response.then(function(status){
        if (status === 500){
           throw new Error("error")
        }
    })
    .catch(function(e){
        urlInvalid()
    })
    return response
}

//affichage de l'ourson sur la page produit
recupererProduit(urlTeddy).then (infosProduit => {
    //console.log(infosProduit)
    if(infosProduit.name === "TypeError"){
        serverDown()
    } else {
    creerProduit(infosProduit, "teddy");
    }
})

//ajout de l'ourson au panier
addToBasketButton.addEventListener("click", function () {
    const name = document.getElementById("teddyName").textContent
    const price = document.getElementById("teddyPrice").textContent
    const product = [{nom : name, prix : price, qte : 1, id : id}]

    if (localStorage.getItem("panier") !== null) {   
        const panier = product.concat(JSON.parse(localStorage.getItem("panier")))
        localStorage.setItem("panier", JSON.stringify(panier))
        //console.log(window.localStorage)
   } else {
       localStorage.setItem("panier", JSON.stringify(product))
   }

})