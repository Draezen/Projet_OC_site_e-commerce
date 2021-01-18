class LocalStorage {
    constructor(){
    }

    lire(cle){
        return JSON.parse(localStorage.getItem(cle))   
    }

    creer(cle, valeur){
        if (this.lire(cle) !== null){
            //si la clé existe concaténation de la valeur avec le local storage
            const valeurConcat = valeur.concat(this.lire(cle))
            localStorage.setItem(cle, JSON.stringify(valeurConcat))
        } else {
            //sinon création de la clé
            localStorage.setItem(cle, JSON.stringify(valeur))
        }
    }

    modifier(cle, valeur){
        localStorage.setItem(cle, JSON.stringify(valeur))
    }

    supprimer(cle, element){
        let valeur = this.lire(cle)
        if (valeur.length > 1) {
            //si plus d'un element dans la clé suppression de l'element
            valeur.splice(element, 1)
            this.modifier(cle, valeur)
        } else {
            //si un seul element vidage du local storage
            localStorage.clear()
        }
    }

    vider(){
        localStorage.clear()
    }
}
