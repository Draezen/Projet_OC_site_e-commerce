class ConfirmationController {
    constructor(view, localStorage){
        this.view = view
        this.localStorage = localStorage
    }

    show(){
        if (this.localStorage.lire("commande") !== null){
            this.view.afficherValidationCommande(this.localStorage.lire("commande"))
            localStorage.clear()
        } else {
            window.location.href = "./index.html"
        }
    }
}

const pageConfirmation = new ConfirmationController (new View(), new LocalStorage())

pageConfirmation.show()