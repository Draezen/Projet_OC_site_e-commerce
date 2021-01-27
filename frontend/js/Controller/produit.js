class ProduitController {
    constructor(request, view, panier, localStorage){
        this.request = request
        this.view = view
        this.panier = panier
        this.storage = localStorage
        this.params = (new URL(document.location)).searchParams;
        this.id = this.params.get("id")
        this.urlTeddy = "http://localhost:3000/api/teddies" + "/" + this.id;
    }

    get(){
        const response = this.request.requete(this.urlTeddy);
        response.then (status => {
            if (status === 500){
                throw new Error("error")
            }
        })
        .catch((e) =>{
            //si URL incomplet (id non valide ou manquant)
            this.view.messageErreur("main", "urlInvalid", "<h1>URL invalide !</h1> <h2>Veuillez réessayer avec un autre ourson !</h2>")
        })
        return response
    }

    show(){
        this.view.addLoader("#teddyContainer", "loader")
    
        //affichage de l'ourson sur la page produit
        this.get(this.urlTeddy).then (infosProduit => {
            if(infosProduit.name === "TypeError"){
                //si serveur down
                this.view.messageErreur("main", "serverDown", "<h1>Problème de connexion !</h1> <h2> Veuillez réessayer dans quelques instants !</h2>")
            } else {
                // remplissage de la page produit
                this.view.creerProduit(infosProduit, "teddy");
            }
        })
    }

    addToBasket(produit){
        this.panier.ajouter(this.storage, produit)
        const cptAjout = this.panier.compteurClick();
        this.view.confirmationAjout(cptAjout)
    }
}


const pageProduit = new ProduitController(new Request(), new View(),new ModelPanier(), new LocalStorage())

pageProduit.show()