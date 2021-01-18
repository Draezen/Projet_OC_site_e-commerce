class indexController {
    constructor(request, view){
        this.request = request
        this.view = view
        this.urlTeddies = "http://localhost:3000/api/teddies"
    }
    
    show(){
        this.view.addLoader("#teddiesContainer", "loader")

        this.request.requete(this.urlTeddies).then (listeProduits => {
            if (listeProduits.name === "TypeError"){
                this.view.messageErreur("main", "serverDown", "<h1>Problème de connexion !</h1> <h2> Veuillez réessayer dans quelques instants !</h2>")
            }else {
                this.view.creerListeProduit(listeProduits, "teddies");
            }
        })
    }
}

const pageIndex = new indexController(new Request(), new View())

pageIndex.show()