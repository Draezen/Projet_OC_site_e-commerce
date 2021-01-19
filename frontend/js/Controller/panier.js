class PanierController{
    constructor(request, view, localStorage, panier, form, command){
        this.request = request
        this.view = view
        this.localStorage = localStorage
        this.panier = panier
        this.form = form
        this.command = command

        this.urlOrder = "http://localhost:3000/api/teddies/order";


        //appel de la fonction lierBoutonViderPanier en passant en callback la fonction emptyBasket
        this.view.lierBoutonViderPanier(this.emptyBasket)
        
        this.view.lierChampFormNom(this.checkFieldLastName)
        this.view.lierChampFormPrenom(this.checkFieldFirstName)
        this.view.lierChampFormAdresse(this.checkFieldAddress)
        this.view.lierChampFormCity(this.checkFieldCity)
        this.view.lierChampFormEmail(this.checkFieldEmail)

        this.view.lierEnvoiFormulaire(this.sendForm)
    }

    showBasket(){
        const basketArticles = this.view.selectionnerElement("#basketArticles")
        const basketTotal = this.view.selectionnerElement("#basketTotal")
        this.view.creerPanier(basketArticles, this.localStorage)
        this.priceBasket(basketTotal)
    }

    emptyBasket = () => {
        this.panier.vider()
        this.showBasket()
    }

    deleteProduct(cle, i){
        this.panier.supprimer(cle, i)
        this.showBasket()
    }

    priceBasket(container){
        const priceTotal = this.panier.calculerTotal()
        container.textContent = this.view.calculerDevise(priceTotal)
    }
    
    checkFieldLastName = (elt) =>{
        const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
        this.form.verifierChampValide(elt, regex, "Nom invalide", "helpLastName")
    }
    
    checkFieldFirstName = (elt) =>{
        const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
        this.form.verifierChampValide(elt, regex, "Prénom invalide", "helpFirstName")
    }

    checkFieldAddress = (elt) =>{
        const regex = /^\S[\wÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
        this.form.verifierChampValide(elt, regex, "Adresse invalide", "helpAddress")
    }

    checkFieldCity = (elt) =>{
        const regex = /^\S[a-zA-ZÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñÝý\-\ \']+$/;
        this.form.verifierChampValide(elt, regex, "Ville invalide", "helpCity")
    }

    checkFieldEmail = (elt) =>{
        const regex = /\b[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/;
        this.form.verifierChampValide(elt, regex, "Adresse mail invalide", "helpEmail")
    }

    sendForm = (form) =>{
        const formValide = document.getElementsByClassName("form__help valide")
    
        if (formValide.length === 5){
    
           //envoie de commande en cours
           this.view.loaderCommande()
    
            //completer la commande
            const order = this.command.remplirBonCommande(form, this.localStorage)
            const init = {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(order)
            }
            
            const postCommande = this.request.requete(this.urlOrder, init)
            
            //Recupération de la confirmation de la commande
            postCommande.then(returnData => {
                if (returnData.name === "TypeError"){
                    this.view.messageErreur("main", "serverDown", "<h1>Problème de connexion !</h1> <h2> Veuillez réessayer dans quelques instants !</h2>")
                }else {
                    this.command.validerCommande(returnData, this.localStorage)
                    window.location.href = "./confirmation.html"
                }
            })
        } else {
            this.view.messageErreur("#formInvalid", "" ,"Formulaire non valide ! Vérifiez les informations entrées.")
        }
    }
}

const pagePanier = new PanierController(new Request(), new View(), new LocalStorage(), new ModelPanier(), new ModelForm(), new ModelCommande())

pagePanier.showBasket()