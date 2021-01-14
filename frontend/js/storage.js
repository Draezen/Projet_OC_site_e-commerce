class LocalStorage {
    constructor(cle){
        this.cle = cle;
    }

    lire(){
        return JSON.parse(localStorage.getItem(this.cle))   
    }

    creer(valeur){
        if (this.lire() !== null){
            //si la clé existe concaténation de la valeur avec le local storage
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

    vider(){
        localStorage.clear()
    }
}



//Récupérer les id des produit à commander
const ajouterIdCommande = (produits) => {
    const panierStorage = new LocalStorage("panier")
    const panier = panierStorage.lire()
    panier.forEach(produit => {
        produits.push(produit.id)
    })
    return produits
}

//enregistrement de l'id et du prix
const validerCommande = (data) => {
    const panierStorage = new LocalStorage("commande")
    const price = parseInt(document.getElementById("basketTotal").textContent)
    const id = data.orderId
    const commande = { prix: price, id: id }
    panierStorage.creer(commande)
}

//récupération de la validation de commande
const afficherValidationCommande = () => {
    const panierStorage = new LocalStorage("commande")
    const commande = panierStorage.lire()
    document.getElementById("orderPrice").textContent = prix(commande.prix)
    document.getElementById("orderId").textContent = commande.id
}
