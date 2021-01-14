class indexController {
    constructor(request, view){
        this.request = request
        this.view = view
    }
    
    show(){
        this.request.requete().then (listeProduits => {
            if (listeProduits.name === "TypeError"){
                this.view.messageErreur("main", "serverDown", "<h1>Problème de connexion !</h1> <h2> Veuillez réessayer dans quelques instants !</h2>")
            }else {
                this.view.creerListeProduit(listeProduits, "teddies");
            }
        })
    }
}
const urlTeddies = "http://localhost:3000/api/teddies"

const pageIndex = new indexController(new Request(urlTeddies), new View())

pageIndex.show()