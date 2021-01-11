//Ajout du produit au panier
const ajoutPanier = (product) => {
    if (localStorage.getItem("panier") !== null) {
        //concaténation du produit à ajouter avec le panier en local storage
        const panier = product.concat(JSON.parse(localStorage.getItem("panier")))
        //enregistrement du panier mis à jour dans le local storage 
        localStorage.setItem("panier", JSON.stringify(panier))
    } else {
        localStorage.setItem("panier", JSON.stringify(product))
    }
    confirmationAjout()
}

//Suppression d'un article du panier
const supprArticlePanier = (article) => {
    //récupération du contenu du panier dans le local storage
    let panier = JSON.parse(localStorage.getItem("panier"))
    if (panier.length > 1) {
        //si panier contient plus d'un article, suppression de l'article
        panier.splice(article, 1)
        localStorage.setItem("panier", JSON.stringify(panier))
    } else {
        //si panier contient 1 seul article vidage du local storage
        localStorage.clear()
    }
}

//Récupérer les id des produit à commander
const ajouterIdCommande = (products) => {
    const panier = JSON.parse(localStorage.getItem("panier"))
    panier.forEach(produit => {
        products.push(produit.id)
    })
    return products
}

//enregistrement de l'id et du prix
const validerCommande = (data) => {
    const price = parseInt(document.getElementById("basketTotal").textContent)
    const id = data.orderId
    const command = { prix: price, id: id }
    localStorage.setItem("commande", JSON.stringify(command))
}

//récupération de la validation de commande
const afficherValidationCommande = () => {
    const command = JSON.parse(localStorage.getItem("commande"))
    document.getElementById("orderPrice").textContent = prix(command.prix)
    document.getElementById("orderId").textContent = command.id
}