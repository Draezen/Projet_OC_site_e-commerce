class ModelPanier {
    constructor(){
        this.compteur = 1
    }

    ajouter(storage, produit){
        storage.creer("panier", produit)
    }

    supprimer(storage, cle, article){
        storage.supprimer(cle, article)
    }

    vider(storage){
        storage.vider()
    }

    calculerTotal(){
        const prices = document.getElementsByClassName("basket__recap--price")
        let priceTotal = 0
        for (let price of prices) {
            priceTotal += parseInt(price.textContent)
        }
        return priceTotal
    }

    //compteur de click
    compteurClick() {
        return this.compteur ++
    }
}