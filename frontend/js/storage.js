class LocalStorage {
    constructor(cle){
        this.cle = cle;
    }

    lire(){
        return JSON.parse(localStorage.getItem(this.cle))   
    }

    creer(valeur){
        if (this.lire() !== null){
            //si la clé existe concaténation de la valeur  avec le local storage
            const valeurConcat = valeur.concat(this.lire())
            localStorage.setItem(this.cle, JSON.stringify(valeurConcat))
        } else {
            //sinon création de la clé
            localStorage.setItem(this.cle, JSON.stringify(valeur))
        }
    }

    modifier(valeur){
        localStorage.setItem(this.cle, JSON.stringify(valeur))
    }

    supprimer(element){
        let valeur = this.lire()
        if (valeur.length > 1) {
            //si plus d'un element dans la clé suppression de l'element
            valeur.splice(element, 1)
            this.modifier(valeur)
        } else {
            //si un seul element vidage du local storage
            localStorage.clear()
        }
    }
}

//Ajout du produit au panier
const ajoutPanier = (produit) => {
    const panierStorage = new LocalStorage("panier")
    panierStorage.creer(produit)
    // if (panierStorage.recuperer() !== null) {
    //     //concaténation du produit à ajouter avec le panier en local storage
    //     const panier = produit.concat(panierStorage.recuperer())
    //     //enregistrement du panier mis à jour dans le local storage 
    //     panierStorage.stocker(panier)
    // } else {
    //     panierStorage.stocker(produit)
    // }
    confirmationAjout()
}

//Suppression d'un article du panier
const supprArticlePanier = (article) => {
    const panierStorage = new LocalStorage("panier")
    panierStorage.supprimer(article)
    //récupération du contenu du panier dans le local storage
    // let panier = panierStorage.recuperer()
    // if (panier.length > 1) {
    //     //si panier contient plus d'un article, suppression de l'article
    //     panier.splice(article, 1)
    //     panierStorage.stocker(panier)
    // } else {
    //     //si panier contient 1 seul article vidage du local storage
    //     localStorage.clear()
    // }
}

//Récupérer les id des produit à commander
const ajouterIdCommande = (products) => {
    const panierStorage = new LocalStorage("panier")
    const panier = panierStorage.lire()
    panier.forEach(produit => {
        products.push(produit.id)
    })
    return products
}

//enregistrement de l'id et du prix
const validerCommande = (data) => {
    const panierStorage = new LocalStorage("commande")
    const price = parseInt(document.getElementById("basketTotal").textContent)
    const id = data.orderId
    const command = { prix: price, id: id }
    panierStorage.creer(command)
}

//récupération de la validation de commande
const afficherValidationCommande = () => {
    const panierStorage = new LocalStorage("commande")
    const command = panierStorage.lire()
    document.getElementById("orderPrice").textContent = prix(command.prix)
    document.getElementById("orderId").textContent = command.id
}
