class ConfirmationController {
    constructor(view, localStorage, command){
        this.view = view
        this.localStorage = localStorage
        this.command = command
    }

    show(){
        if (this.localStorage.lire("commande") !== null){
            this.view.afficherValidationCommande(this.localStorage, this.localStorage.lire("commande"))
            localStorage.clear()
        } else {
            window.location.href = "./index.html"
        }
    }
}

const pageConfirmation = new ConfirmationController (new View(), new LocalStorage(), new ModelCommande())

pageConfirmation.show()